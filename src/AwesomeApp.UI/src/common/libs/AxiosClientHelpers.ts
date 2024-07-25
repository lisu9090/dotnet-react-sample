import axios, { HttpStatusCode, AxiosRequestConfig, AxiosResponse, AxiosResponseTransformer } from 'axios'
import { HEADER_CONTENT_TYPE } from '../consts'

export const isOkStatusCode = (status: number | undefined): boolean =>
  !!status && status >= 200 && status < 300

export const isOkResponse = (response: AxiosResponse): boolean => 
  isOkStatusCode(response.status)

export const getDataOrNullTransformer: AxiosResponseTransformer = (data, _, status) => 
  isOkStatusCode(status) ? data : null

export class AxiosRequestConfigBuilder {
  private config: AxiosRequestConfig = { }

  private constructor() { }

  static create(): AxiosRequestConfigBuilder {
    return new AxiosRequestConfigBuilder()
  }

  addContentTypeHeader(contentType: string): this {
    if (!this.config.headers) {
      this.config.headers = {}
    }
    
    this.config.headers[HEADER_CONTENT_TYPE] = contentType

    return this
  }

  addAcceptStatusCodes(...statuses: HttpStatusCode[]): this {
    if (statuses) {
      this.config.validateStatus = (status) => statuses.includes(status)
    }

    return this
  }

  addCombinedResponseTransformers(...responseTransformers: AxiosResponseTransformer[]): this {
    if (responseTransformers) {
      this.config.transformResponse = new Array<AxiosResponseTransformer>()
        .concat(axios.defaults.transformResponse ?? [], responseTransformers)
    }

    return this
  }

  build(): AxiosRequestConfig {
    return this.config
  }
}

export const toQueryParams = (parametersDictionary: { [parameter: string]: string | number }) => 
  "?" + Object
    .keys(parametersDictionary)
    .map(parameter => `${parameter}=${encodeURI(parametersDictionary[parameter].toString())}`)
    .join('&')
    