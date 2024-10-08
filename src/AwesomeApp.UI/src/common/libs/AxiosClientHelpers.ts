import axios, { HttpStatusCode, AxiosRequestConfig, AxiosResponse, AxiosResponseTransformer } from 'axios'
import { HEADER_CONTENT_TYPE } from '../consts'

/**
 * Checks if status code indicates success
 * @param status Status code
 * @returns Successful status code indicator
 */
export const isOkStatusCode = (status: number | undefined): boolean =>
  !!status && status >= 200 && status < 300

/**
 * Checks if status code of AxiosResponse indicates success
 * @param response Axios response
 * @returns Successful status code indicator
 */
export const isOkResponse = (response: AxiosResponse): boolean => 
  isOkStatusCode(response.status)

/**
 * Transformer to obtain data from AxiosResponse on successful status code
 * @param data Data
 * @param _ Ignored
 * @param status Status code
 * @returns Data or null
 */
export const getDataOrNullTransformer: AxiosResponseTransformer = (data, _, status) => 
  isOkStatusCode(status) ? data : null

/**
 * Builds request configuration
 */
export class AxiosRequestConfigBuilder {
  private config: AxiosRequestConfig = { }

  private constructor() { }

  /**
   * Creates instance
   * @returns Instance
   */
  static create(): AxiosRequestConfigBuilder {
    return new AxiosRequestConfigBuilder()
  }

  /**
   * Adds value to content type header
   * @param contentType content type string
   * @returns Builder instance 
   */
  addContentTypeHeader(contentType: string): this {
    if (!this.config.headers) {
      this.config.headers = {}
    }
    
    this.config.headers[HEADER_CONTENT_TYPE] = contentType

    return this
  }

  /**
   * Adds expected response status codes so they won't throw Error. Helpful to handle known errors using ActionResult
   * @param statuses Expected status codes
   * @returns Builder instance
   */
  addAcceptStatusCodes(...statuses: HttpStatusCode[]): this {
    if (statuses) {
      this.config.validateStatus = (status) => statuses.includes(status)
    }

    return this
  }

  /**
   * Combines transformers collection with default transformers collection and adds it to configuration
   * @param responseTransformers Custom transformers to use
   * @returns Builder instance
   */
  addCombinedResponseTransformers(...responseTransformers: AxiosResponseTransformer[]): this {
    if (responseTransformers) {
      this.config.transformResponse = new Array<AxiosResponseTransformer>()
        .concat(axios.defaults.transformResponse ?? [], responseTransformers)
    }

    return this
  }

  /**
   * Builds AxiosRequestConfig instance
   * @returns AxiosRequestConfig instance
   */
  build(): AxiosRequestConfig {
    return this.config
  }
}

/**
 * Maps object into query parameters string; throws error on parameters which are null or undefined
 * @param parametersDictionary Parameters dictionary
 * @returns Query parameters string
 */
export const toQueryParams = (parametersDictionary: { [parameter: string]: string | number }) => 
  "?" + Object
    .keys(parametersDictionary)
    .map(parameter => `${parameter}=${encodeURI(parametersDictionary[parameter].toString())}`)
    .join('&')
    