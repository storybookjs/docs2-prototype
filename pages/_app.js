import 'nextra-theme-docs/style.css';
import { DocsContainer } from '../blocks';

export default function Nextra({ Component, pageProps }) {
  return (
    <DocsContainer context={{}}>
      <Component {...pageProps} />
    </DocsContainer>
  );
}
