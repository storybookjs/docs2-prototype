import React, { useContext, FunctionComponent } from 'react';
import { Title as PureTitle } from '@storybook/components';
import { DocsContext, DocsContextProps } from './DocsContext';

interface TitleProps {
  children?: JSX.Element | string;
}

const STORY_KIND_PATH_SEPARATOR = /\s*\/\s*/;

export const extractTitle = ({ title }: DocsContextProps) => {
  const groups = title.trim().split(STORY_KIND_PATH_SEPARATOR);
  return (groups && groups[groups.length - 1]) || title;
};

export const Title: FunctionComponent<TitleProps> = ({ children }) => {
  const context = useContext(DocsContext);
  let text: JSX.Element | string = children;
  if (!text) {
    text = extractTitle(context);
  }
  return text ? <PureTitle className="sbdocs-title">{text}</PureTitle> : null;
};
