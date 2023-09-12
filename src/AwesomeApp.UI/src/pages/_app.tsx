import './globals.css'
import Head from 'next/head'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: any) {
  return (
    <div className={`${inter.className} page-container`} >
      <Head>
        <link rel="icon" href="favicon.ico" />
        <title>AwesomeApp</title>
      </Head>
      <Component {...pageProps} />
    </div>
  ) 
}
