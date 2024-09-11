/**
 * Checks if environment is set to Production
 * @returns Production environment indicator
 */
export function isProdEnvironment(): boolean {
  return process.env.NEXT_PUBLIC_ENVIRONMENT === 'prod'
}