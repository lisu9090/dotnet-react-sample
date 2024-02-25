const settings = await import(`./${process.env.NEXT_PUBLIC_ENVIRONMENT}.settings.json`)
  .then((obj: Settings) => Object.freeze(obj))

export default settings

export interface Settings {
  awesomeApiConfig: {
    baseUrl: string;
  };
}
