import '../styles/globals.css'
import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar/Navbar'
import PropTypes from 'prop-types'

export default function App ({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Community Saxxy Awards</title>
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="fixed h-screen w-screen overflow-hidden z-0">
        <Image
          alt="Process"
          src="/process.jpg"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}

App.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object
}
