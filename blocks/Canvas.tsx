import React, { FC, useContext } from 'react';
import { MDXProvider } from '@mdx-js/react';
import {
  resetComponents,
  Preview as PurePreview,
  PreviewProps as PurePreviewProps,
} from '@storybook/components';
import { SourceContext } from './SourceContainer';
import { SourceState } from './Source';

type CanvasProps = PurePreviewProps & {
  withSource?: SourceState;
  mdxSource?: string;
};

export const Canvas: FC<CanvasProps> = (props) => {
  const { children, ...previewProps } = props;
  const sourceContext = useContext(SourceContext);

  return (
    <MDXProvider components={resetComponents}>
      <PurePreview isLoading {...previewProps}>
        {children}
      </PurePreview>
    </MDXProvider>
  );
};
