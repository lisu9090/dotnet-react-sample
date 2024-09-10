export function isProductionEnvironment(): boolean {
  return process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'
}