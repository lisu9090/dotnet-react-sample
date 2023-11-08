import { useState } from "react"

export type ModuleInitializer = () => Promise<any>

export function useModulesInit(moduleInitializers: ModuleInitializer[]): boolean {
  const [modulesInitialized, setModulesInitialized] = useState<boolean>(false)

  if (!modulesInitialized) {
    Promise
      .all(moduleInitializers.map(initializer => initializer()))
      .then(() => setModulesInitialized(true))
  }

  return modulesInitialized
}