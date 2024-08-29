/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

/**
 * Type of module async initialization function
 */
export type ModuleInitializer = () => Promise<void>

/**
 * Hook that initializes all modules on application startup
 * @param moduleInitializers array of initialization functions
 * @returns all modules initialized indicator
 */
export function useModulesInit(moduleInitializers: ModuleInitializer[]): boolean {
  const [modulesInitialized, setModulesInitialized] = useState<boolean>(false)

  useEffect(
    () => {
      Promise
        .all(moduleInitializers.map(initializer => initializer()))
        .then(() => setModulesInitialized(true))
    },
    [/* Module init should be fired only once */] 
  )

  return modulesInitialized
}