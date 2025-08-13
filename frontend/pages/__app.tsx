import type { AppProps } from 'next/app';
import '../src/index.css'; // using your existing path

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
