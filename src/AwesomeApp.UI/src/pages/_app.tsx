import './globals.css'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useMemo } from 'react'
import { PageBox } from '@/frontend/components'
import { ModuleInitializer, useModulesInit } from '@/frontend/hooks'
import initAppSettings from '@/frontend/libs/Settings'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: any) {
  const modulesInitlializers = useMemo<ModuleInitializer[]>(
    () => [
      initAppSettings
    ],
    []
  )

  const appInitialized = useModulesInit(modulesInitlializers)

  return (
    <div className={`${inter.className} page-container`} >
      <Head>
        <link rel="icon" href="favicon.ico" />
        <title>AwesomeApp</title>
      </Head>
      {appInitialized && <Component {...pageProps} />}
      {!appInitialized && <PageBox>AwesomeApp is loading...</PageBox>}   
    </div>
  ) 
}
