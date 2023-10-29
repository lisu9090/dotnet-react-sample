export interface BackendConfig {
  apiConfig: {
    baseUrl: string;
  };
}

export interface FrontendConfig {
}

// TODO throw error if configs have not been found

export const backendConfig: Promise<BackendConfig> = import(`@/backend.${process.env.NODE_ENVIRONMENT}.config.json`)
export const frontendConfig: Promise<FrontendConfig> = import(`@/frontend.${process.env.NODE_ENVIRONMENT}.config.json`)
