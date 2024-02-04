import { AppSettings } from "@/shared/types"
import { apiService } from "."

let appSettings: AppSettings

export default async function initAppSettings(): Promise<void> {
  appSettings = await apiService.getConfig()
}

export function getAppSettings(): AppSettings {
  if (!appSettings) {
    throw new Error("Module Settigns has not been initialized")
  }

  return { ...appSettings }
}
