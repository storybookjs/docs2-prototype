import 'nextra-theme-docs/style.css';
import { DocsContainer } from '../blocks';

const Wrapper = ({ children }) => <div style={{ border: '5px solid red' }}>{children}</div>;

export default function Nextra({ Component, pageProps }) {
  return (
    <Wrapper>
      <DocsContainer context={{}}>
        <Component {...pageProps} />
      </DocsContainer>
    </Wrapper>
  );
}
