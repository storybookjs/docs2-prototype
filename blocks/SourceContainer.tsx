import React, { FC, Context, createContext, useEffect, useState } from 'react';
import deepEqual from 'fast-deep-equal';
import { addons } from '@storybook/addons';
import { StoryId } from '@storybook/api';
import { SNIPPET_RENDERED } from './shared';

export type SourceItem = string;
export type StorySources = Record<StoryId, SourceItem>;

export interface SourceContextProps {
  sources: StorySources;
  setSource?: (id: StoryId, item: SourceItem) => void;
}

export const SourceContext: Context<SourceContextProps> = createContext({ sources: {} });

export const SourceContainer: FC<{}> = ({ children }) => {
  const [sources, setSources] = useState<StorySources>({});
  const channel = addons.getChannel();

  useEffect(() => {
    const handleSnippetRendered = (id: StoryId, newItem: SourceItem) => {
      if (newItem !== sources[id]) {
        setSources((current) => {
          const newSources = { ...current, [id]: newItem };

          if (!deepEqual(current, newSources)) {
            return newSources;
          }
          return current;
        });
      }
    };

    channel.on(SNIPPET_RENDERED, handleSnippetRendered);

    return () => channel.off(SNIPPET_RENDERED, handleSnippetRendered);
  });

  return <SourceContext.Provider value={{ sources }}>{children}</SourceContext.Provider>;
};
