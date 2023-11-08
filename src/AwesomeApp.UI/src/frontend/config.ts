export interface FrontendConfig {
  apiConfig: {
    baseUrl: string;
  };
}

export const frontendConfig: Promise<FrontendConfig> = import(`./frontend.${process.env.NODE_ENVIRONMENT}.config.json`)
