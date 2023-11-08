export interface BackendConfig {
  awesomeApiConfig: {
    baseUrl: string;
  };
}

export const backendConfig: Promise<BackendConfig> = import(`./backend.${process.env.NODE_ENVIRONMENT}.config.json`)
