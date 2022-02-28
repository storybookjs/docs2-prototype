import 'nextra-theme-docs/style.css';
// import { ThemeProvider, Global, convert, createReset, themes } from '@storybook/theming';
import { DocsContainer } from '../blocks';

const Wrapper = ({ children }) => <div style={{ border: '5px solid red' }}>{children}</div>;

export default function Nextra({ Component, pageProps }) {
  return (
    <Wrapper>
      <DocsContainer context={{ projectAnnotations: {} }}>
        <Component {...pageProps} />
      </DocsContainer>
      {/* <ThemeProvider theme={convert(themes.light)}>
        <Global styles={createReset} />
        <Component {...pageProps} />
      </ThemeProvider>{' '} */}
    </Wrapper>
  );
}
