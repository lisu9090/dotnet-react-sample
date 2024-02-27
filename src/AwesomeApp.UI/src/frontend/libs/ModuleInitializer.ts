/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"

export type ModuleInitializer = () => Promise<void>

export function useModulesInit(moduleInitializers: ModuleInitializer[]): boolean {
  const [modulesInitialized, setModulesInitialized] = useState<boolean>(false)

  useEffect(
    () => {
      Promise
        .all(moduleInitializers.map(initializer => initializer()))
        .then(() => setModulesInitialized(true))
    },
    [] // Module init should be fired only once
  )

  return modulesInitialized
}