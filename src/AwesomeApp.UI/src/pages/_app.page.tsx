import './globals.css'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import { ReactElement } from 'react'
import { SpinnerProvider, SnackbarProvider, PageBox } from '@/frontend/components'
import { useModulesInit, initAppSettingsModule } from '@/frontend/libs'

const nextRootElementId = '__next'
const inter = Inter({ subsets: ['latin'] })

function applyInter(): Promise<void> {
  return new Promise(resolve => {
    const element = document.getElementById(nextRootElementId)

    if (element) {
      element.className = inter.className
    }

    resolve()
  })
}

export default function App({ Component, pageProps }: any): ReactElement {
  const isAppInited = useModulesInit([
    applyInter,
    initAppSettingsModule
  ])

  return (
    <>
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
    </>
  ) 
}
