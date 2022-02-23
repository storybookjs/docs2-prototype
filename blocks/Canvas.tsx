import React, { FC, useContext } from 'react';
import { MDXProvider } from '@mdx-js/react';
import {
  resetComponents,
  Preview as PurePreview,
  PreviewProps as PurePreviewProps,
  PreviewSkeleton,
} from '@storybook/components';
import { DocsContext } from './DocsContext';
// import { SourceContext } from './SourceContainer';
// import { SourceState } from './Source';

// export { SourceState };

type CanvasProps = PurePreviewProps & {
  //   withSource?: SourceState;
  mdxSource?: string;
};

export const Canvas: FC<CanvasProps> = (props) => {
  const { children, ...previewProps } = props;
  return (
    <MDXProvider components={resetComponents}>
      <PurePreview {...previewProps}>{children}</PurePreview>
    </MDXProvider>
  );
};
