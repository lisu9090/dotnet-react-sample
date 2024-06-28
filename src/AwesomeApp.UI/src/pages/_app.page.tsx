import './globals.css'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import { ReactElement } from 'react'
import { SpinnerProvider, SnackbarProvider, PageBox } from '@/frontend/components'
import { useModulesInit, initAppSettingsModule } from '@/frontend/libs'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: any): ReactElement {
  const isAppInited = useModulesInit([
    initAppSettingsModule,
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
