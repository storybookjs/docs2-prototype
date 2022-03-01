import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { resetComponents, Story as PureStory, StorySkeleton } from '@storybook/components';
import { ComponentAnnotations, StoryAnnotationsOrFn } from '@storybook/csf';
import { composeStory } from '@storybook/testing-react';

import { DocsContext } from './DocsContext';
import { StoryFn } from '@storybook/react';

export interface StoryProps {
  of: StoryAnnotationsOrFn;
  meta: ComponentAnnotations;
  height?: string;
}

export const Story: FunctionComponent<StoryProps> = ({ of, meta: manualMeta, ...rest }) => {
  const { meta: contextMeta } = useContext(DocsContext);
  const meta = manualMeta || contextMeta;
  const [composed, setComposed] = useState<StoryFn>();
  useEffect(() => {
    if (meta) {
      setComposed(() => composeStory(of as any, meta as any));
    }
  }, [meta, of]);

  if (!composed) return <StorySkeleton />;

  return (
    <MDXProvider components={resetComponents}>
      <PureStory id="foo" inline storyFn={composed} {...rest} />
    </MDXProvider>
  );
};
