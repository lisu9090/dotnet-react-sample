export interface BackendConfig {
  apiConfig?: {
    baseUrl: string;
  };
}

export interface FrontendConfig {
}

export const backendConfig: Promise<BackendConfig> = import(`@/backend.${process.env.NODE_ENVIRONMENT}.config.json`)
export const frontendConfig: Promise<FrontendConfig> = import(`@/frontend.${process.env.NODE_ENVIRONMENT}.config.json`)

// import(`@/backend.${process.env.NODE_ENVIRONMENT}.config.json`)
//   .then((module: BackendConfig) => backendConfig = module)

// import(`@/frontend.${process.env.NODE_ENVIRONMENT}.config.json`)
//   .then((module: FrontendConfig) => frontendConfig = module)
