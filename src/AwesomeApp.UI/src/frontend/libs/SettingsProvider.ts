import { AppSettings } from '@/common/types'
import { fetchSettings } from './ApiClient'

let appSettings: AppSettings

export async function initAppSettingsModule(): Promise<void> {
  appSettings = await fetchSettings()
}

export function getAppSettings(): AppSettings {
  if (!appSettings) {
    throw new Error('Module Settigns has not been initialized')
  }

  return { ...appSettings }
}
