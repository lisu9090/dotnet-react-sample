import './globals.css'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import { initApiCient, useModulesInit } from '@/frontend/libs'
import initAppSettings from '@/frontend/libs/SettingsProvider'
import { ReactElement } from 'react'
import { SpinnerProvider, SnackbarProvider, PageBox } from '@/frontend/components'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: any): ReactElement {
  const isAppInited = useModulesInit([
    initAppSettings,
    initApiCient
  ])

  return (
    <div className={`${inter.className} page-container`} >
      <Head>
        <link rel="icon" href="favicon.ico" />
        <title>AwesomeApp</title>
      </Head>
      {!isAppInited && <PageBox>AwesomeApp is loading...</PageBox>}
      {isAppInited && (
        <SpinnerProvider>
          <SnackbarProvider>
            <Component {...pageProps} />
          </SnackbarProvider>
        </SpinnerProvider>
      )}
    </div>
  ) 
}