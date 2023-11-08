import { AppSettings } from '@/shared/types'
import { ApiSettings } from './ApiSettings'
import apiLocalSettigns from './api.local.settings.json'
import apiProdSettigns from './api.prod.settings.json'
import appLocalSettigns from './app.local.settings.json'
import appProdSettigns from './app.prod.settings.json'

function selectSettings(): { apiSettings: ApiSettings, appSettings: AppSettings } {
  switch (process.env.NODE_ENVIRONMENT) {
    case 'local':
      return { 
        apiSettings: apiLocalSettigns, 
        appSettings: appLocalSettigns 
      }
    case 'prod':
      return { 
        apiSettings: apiProdSettigns, 
        appSettings: appProdSettigns 
      }
    default:
      throw new Error(`No settings for envorinment ${process.env.NODE_ENVIRONMENT}`)
  }
}

export const { apiSettings, appSettings } = selectSettings()
 