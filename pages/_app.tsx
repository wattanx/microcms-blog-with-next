import { AppProps } from 'next/app';
import Head from 'next/head';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { config } from '../site.config';
import '../styles/globals.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  const title = config.siteMeta.title;
  const pageUrl = config.baseUrl;
  const description = config.siteMeta.description;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site" content={title} />
        <meta />
        {!!description && (
          <>
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
          </>
        )}
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.2/lazysizes.min.js"
          async
        ></script>
      </Head>
      <div className="wrapper">
        <Header />
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}
