import { AppSettings } from "@/shared/types"
import { fetchSettings } from "./ApiClient"

let appSettings: AppSettings

export default async function initAppSettings(): Promise<void> {
  appSettings = await fetchSettings()
}

export function getAppSettings(): AppSettings {
  if (!appSettings) {
    throw new Error("Module Settigns has not been initialized")
  }

  return { ...appSettings }
}
