import '../styles/globals.css';
import Head from 'next/head';
import Header from '../components/Header'

export default function App({ Component, pageProps }) {
  return (
    <div className="h-full min-h-screen antialiased bg-process bg-cover bg-center bg-fixed">
      <Head>
        <title>Community Saxxy Awards</title>
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="">
        <Component {...pageProps} />
      </main>
    </div>
  )
}