import { AppProps } from 'next/app';
import Head from 'next/head';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import '../styles/globals.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap"
        />
      </Head>
      <div className="wrapper">
        <Header />
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}
