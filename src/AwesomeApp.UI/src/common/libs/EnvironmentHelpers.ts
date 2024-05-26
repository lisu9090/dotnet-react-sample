export function isProdEnvironment(): boolean {
  return process.env.NEXT_PUBLIC_ENVIRONMENT === 'prod'
}