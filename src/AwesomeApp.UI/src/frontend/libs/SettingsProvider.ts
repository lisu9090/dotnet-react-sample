import { AppSettings } from '@/common/types'
import { fetchSettings } from './ApiClient'

let appSettings: AppSettings

/**
 * Inits app settings by fetching them from backend
 */
export async function initAppSettingsModule(): Promise<void> {
  appSettings = await fetchSettings()
}

/**
 * Gets app settings when inited, otherwise throws error
 * @returns App settings
 */
export function getAppSettings(): AppSettings {
  if (!appSettings) {
    throw new Error('Module Settigns has not been initialized')
  }

  return { ...appSettings }
}
