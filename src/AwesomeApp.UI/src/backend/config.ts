export interface BackendConfig {
  awesomeApiConfig: {
    baseUrl: string;
  };
}

// TODO throw error if configs have not been found

export const backendConfig: Promise<BackendConfig> = import(`@/backend.${process.env.NODE_ENVIRONMENT}.config.json`)
