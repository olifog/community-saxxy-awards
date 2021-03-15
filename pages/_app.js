import '../styles/globals.css'
import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar/Navbar'
import PropTypes from 'prop-types'
import CookieConsent from 'react-cookie-consent'
import Router from 'next/router'
import Link from 'next/link'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showBar: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

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
      <CookieConsent
        buttonText="Okay!"
        cookieName="userAccepted"
        style={{ background: '#2B373B' }}
        buttonStyle={{ color: '#120106', fontSize: '14px' }}
        overlay={true}
      >
        This website uses cookies to enhance the user experience!
        <br />
        <span className="text-sm space-x-1">
          <div className="inline-block">
            By continuing to use our site, you agree to our
          </div>
          <Link href="/terms"><a className="text-blue-600 inline-block">terms and conditions</a></Link>
          <div className="inline-block">
            /
          </div>
          <Link href="/privacypolicy"><a className="text-blue-600 inline-block">privacy policy</a></Link>.
        </span>
      </CookieConsent>
      <main>
        <div className="flex flex-col items-center">
          <div className="fixed h-screen w-full max-w-screen-md mx-auto bg-darkred-light z-1"></div>
          <Component {...pageProps} />
        </div>
      </main>
    </>
  )
}

App.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object
}
