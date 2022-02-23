import React, { FunctionComponent, useState } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { ThemeProvider, ensure as ensureTheme, themes } from '@storybook/theming';
import { DocsWrapper, DocsContent, components as htmlComponents } from '@storybook/components';
import { AnyFramework, ComponentAnnotations } from '@storybook/csf';
import { DocsContextProps, DocsContext } from './DocsContext';
import { SourceContainer } from './SourceContainer';
import { CodeOrSourceMdx, AnchorMdx, HeadersMdx } from './mdx';

export interface DocsContainerProps<TFramework extends AnyFramework = AnyFramework> {
  context: DocsContextProps<TFramework>;
}

const defaultComponents = {
  ...htmlComponents,
  code: CodeOrSourceMdx,
  a: AnchorMdx,
  ...HeadersMdx,
};

export const DocsContainer: FunctionComponent<DocsContainerProps> = ({ context, children }) => {
  const [meta, setMeta] = useState<ComponentAnnotations | undefined>();
  const themeVars = themes.light;
  const theme = ensureTheme(themeVars);
  const allComponents = defaultComponents;

  const value = { ...context, meta, setMeta };
  return (
    <DocsContext.Provider value={value}>
      {/* <SourceContainer> */}
      <ThemeProvider theme={theme}>
        <MDXProvider components={allComponents}>
          <DocsWrapper className="sbdocs sbdocs-wrapper">
            <DocsContent className="sbdocs sbdocs-content">{children}</DocsContent>
          </DocsWrapper>
        </MDXProvider>
      </ThemeProvider>
      {/* </SourceContainer> */}
    </DocsContext.Provider>
  );
};
