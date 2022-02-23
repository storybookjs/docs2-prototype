import React, { useContext, FC } from 'react';
import { Story } from '@storybook/store';

import { DocsContext } from './DocsContext';
import { DocsStory } from './DocsStory';

interface PrimaryProps {
  name?: string;
}

export const Primary: FC<PrimaryProps> = ({ name }) => {
  const { componentStories: getComponentStories } = useContext(DocsContext);
  const componentStories = getComponentStories();
  let story;
  if (componentStories) {
    story = name ? componentStories.find((s: Story<any>) => s.name === name) : componentStories[0];
  }
  return story ? <DocsStory {...story} expanded={false} withToolbar /> : null;
};
