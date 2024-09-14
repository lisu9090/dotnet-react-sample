import './globals.css'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import { ReactElement } from 'react'
import { SpinnerProvider, SnackbarProvider } from '@/frontend/components'
import { useModulesInit, initAppSettingsModule } from '@/frontend/libs'
import { AppLoading } from '@/frontend/views'

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

/**
 * Base Component for all Pages
 * @param Page Component and its props
 * @returns Page Component 
 */
export default function App({ Component, pageProps }: any): ReactElement {
  const isAppInitialized = useModulesInit([
    applyInter,
    initAppSettingsModule
  ])

  return (
    <>
      <Head>
        <link rel="icon" href="favicon.ico" />
        <title>AwesomeApp</title>
      </Head>
      {!isAppInitialized && <AppLoading />}
      {isAppInitialized && (
        <SpinnerProvider>
          <SnackbarProvider>
            <Component {...pageProps} />
          </SnackbarProvider>
        </SpinnerProvider>
      )}
    </>
  ) 
}
