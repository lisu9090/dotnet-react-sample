const settings = await import(`./${process.env.NEXT_PUBLIC_ENVIRONMENT}.settings.json`)
  .then((obj: Settings) => Object.freeze(obj))

/**
 * Provides environment specific app configuration
 */
export default settings

/**
 * Settings type placeholder; provides environment-specific app configuration
 */
export interface Settings {
}
