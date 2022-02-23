import React, { FC, useContext } from 'react';
import {
  Source as PureSource,
  SourceError,
  SourceProps as PureSourceProps,
} from '@storybook/components';
import { StoryId } from '@storybook/api';
import { Story } from '@storybook/store';

import { DocsContext, DocsContextProps } from './DocsContext';
import { SourceContext, SourceContextProps } from './SourceContainer';
import { CURRENT_SELECTION } from './types';
import { SourceType } from '../shared';

import { enhanceSource } from './enhanceSource';
import { useStories } from './useStory';

export enum SourceState {
  OPEN = 'open',
  CLOSED = 'closed',
  NONE = 'none',
}

interface CommonProps {
  language?: string;
  dark?: boolean;
  code?: string;
}

type SingleSourceProps = {
  id: string;
} & CommonProps;

type MultiSourceProps = {
  ids: string[];
} & CommonProps;

type CodeProps = {
  code: string;
} & CommonProps;

type NoneProps = CommonProps;

type SourceProps = SingleSourceProps | MultiSourceProps | CodeProps | NoneProps;

const getSourceState = (stories: Story[]) => {
  const states = stories.map((story) => story.parameters.docs?.source?.state).filter(Boolean);
  if (states.length === 0) return SourceState.CLOSED;
  // FIXME: handling multiple stories is a pain
  return states[0];
};

const getStorySource = (storyId: StoryId, sourceContext: SourceContextProps): string => {
  const { sources } = sourceContext;
  // source rendering is async so source is unavailable at the start of the render cycle,
  // so we fail gracefully here without warning
  return sources?.[storyId] || '';
};

const getSnippet = (snippet: string, story?: Story<any>): string => {
  if (!story) {
    return snippet;
  }

  const { parameters } = story;
  // eslint-disable-next-line no-underscore-dangle
  const isArgsStory = parameters.__isArgsStory;
  const type = parameters.docs?.source?.type || SourceType.AUTO;

  // if user has hard-coded the snippet, that takes precedence
  const userCode = parameters.docs?.source?.code;
  if (userCode !== undefined) {
    return userCode;
  }

  // if user has explicitly set this as dynamic, use snippet
  if (type === SourceType.DYNAMIC) {
    return parameters.docs?.transformSource?.(snippet, story) || snippet;
  }

  // if this is an args story and there's a snippet
  if (type === SourceType.AUTO && snippet && isArgsStory) {
    return parameters.docs?.transformSource?.(snippet, story) || snippet;
  }

  // otherwise, use the source code logic
  const enhanced = enhanceSource(story) || parameters;
  return enhanced?.docs?.source?.code || '';
};

type SourceStateProps = { state: SourceState };

export const getSourceProps = (
  props: SourceProps,
  docsContext: DocsContextProps<any>,
  sourceContext: SourceContextProps
): PureSourceProps & SourceStateProps => {
  const { id: currentId, storyById } = docsContext;
  const { parameters } = storyById(currentId);

  const codeProps = props as CodeProps;
  const singleProps = props as SingleSourceProps;
  const multiProps = props as MultiSourceProps;

  let source = codeProps.code; // prefer user-specified code

  const targetIds = multiProps.ids || [singleProps.id || currentId];
  const storyIds = targetIds.map((targetId) =>
    targetId === CURRENT_SELECTION ? currentId : targetId
  );

  const stories = useStories(storyIds, docsContext);
  if (!stories.every(Boolean)) {
    return { error: SourceError.SOURCE_UNAVAILABLE, state: SourceState.NONE };
  }

  if (!source) {
    source = storyIds
      .map((storyId, idx) => {
        const storySource = getStorySource(storyId, sourceContext);
        const storyObj = stories[idx] as Story;
        return getSnippet(storySource, storyObj);
      })
      .join('\n\n');
  }

  const state = getSourceState(stories as Story[]);

  const { docs: docsParameters = {} } = parameters;
  const { source: sourceParameters = {} } = docsParameters;
  const { language: docsLanguage = null } = sourceParameters;

  return source
    ? {
        code: source,
        state,
        language: props.language || docsLanguage || 'jsx',
        dark: props.dark || false,
      }
    : { error: SourceError.SOURCE_UNAVAILABLE, state };
};

/**
 * Story source doc block renders source code if provided,
 * or the source for a story if `storyId` is provided, or
 * the source for the current story if nothing is provided.
 */
export const Source: FC<SourceProps> = (props) => {
  const sourceContext = useContext(SourceContext);
  const docsContext = useContext(DocsContext);
  const sourceProps = getSourceProps(props, docsContext, sourceContext);
  return <PureSource {...sourceProps} />;
};
