/**
 * Checks if environment is set to Production
 * @returns Production environment indicator
 */
export function isProductionEnvironment(): boolean {
  return process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'
}