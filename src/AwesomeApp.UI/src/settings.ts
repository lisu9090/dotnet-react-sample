const settings = await import(`${process.env.NODE_ENVIRONMENT}.settings.json`).then((obj: Settings) => Object.freeze(obj))

export default settings

export interface Settings {
  awesomeApiConfig: {
    baseUrl: string;
  };
}
