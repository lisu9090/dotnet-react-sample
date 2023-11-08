import { ApiSettings } from './ApiSettings'
import { AppSettings } from '@/shared/models/AppSettings'
import apiLocalSettigns from './api.local.settings.json'
import apiProdSettigns from './api.local.settings.json'
import appLocalSettigns from './api.local.settings.json'
import appProdSettigns from './api.local.settings.json'

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
 