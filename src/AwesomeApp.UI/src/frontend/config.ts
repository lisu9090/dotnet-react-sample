export interface FrontendConfig {
}

// TODO throw error if configs have not been found

export const frontendConfig: Promise<FrontendConfig> = import(`@/frontend.${process.env.NODE_ENVIRONMENT}.config.json`)
