import './globals.css'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useModulesInit } from '@/frontend/hooks'
import initAppSettings from '@/frontend/libs/SettingsProvider'
import { PageBox } from '@/frontend/components'
import { ReactElement } from 'react'
import { Spinner } from '@/frontend/components/spinner'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: any): ReactElement {
  const isAppInited = useModulesInit([
    initAppSettings
  ])

  return (
    <div className={`${inter.className} page-container`} >
      <Head>
        <link rel="icon" href="favicon.ico" />
        <title>AwesomeApp</title>
      </Head>
      {isAppInited && <Component {...pageProps} />}
      {!isAppInited && <PageBox>AwesomeApp is loading...</PageBox>}
      <Spinner />
    </div>
  ) 
}
