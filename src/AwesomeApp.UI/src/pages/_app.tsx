import './globals.css'
import Head from 'next/head'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: any) {
  return (
    <div className="page">
      <Head>
        <link rel="icon" href="favicon.ico" />
        <title>Test</title>
      </Head>
      <div className={`${inter.className} page`} >
        <Component {...pageProps} />
      </div>
    </div>
  ) 
  
}
