import { FunctionComponent, ElementType, useContext, useState } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { resetComponents, Story as PureStory, StorySkeleton } from '@storybook/components';
import { StoryAnnotationsOrFn } from '@storybook/csf';
import { composeStory } from '@storybook/testing-react';

import { DocsContext } from './DocsContext';

export interface StoryProps {
  of: StoryAnnotationsOrFn;
  height?: string;
}

export const Story: FunctionComponent<StoryProps> = ({ of, ...rest }) => {
  // console.log({ of });
  const { meta } = useContext(DocsContext);
  const [composed, setComposed] = useState<ElementType>();
  if (!composed && meta) {
    setComposed(composeStory(of as any, meta as any));
  }
  // const composed = ;
  // console.log({ composed, of, meta });

  if (!composed) return <StorySkeleton />;

  console.log({ composed });
  return (
    <MDXProvider components={resetComponents}>
      <PureStory id="foo" inline storyFn={() => composed} {...rest} />
    </MDXProvider>
  );
};
