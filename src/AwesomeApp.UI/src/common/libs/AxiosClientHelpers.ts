import { HttpStatusCode, AxiosRequestConfig, AxiosResponse, AxiosResponseTransformer, AxiosInstance } from 'axios';

export function acceptStatusCodes(statuses: HttpStatusCode[]): AxiosRequestConfig {
  return {
    validateStatus: (status) => statuses.includes(status)   
  }
}

export function setContentType(contentType: string): AxiosRequestConfig {
  return {
    headers: {
      'Content-Type': contentType
    }
  }
}

export function isOkStatusCode(status: number | undefined): boolean {
  return !!status && status >= 200 && status < 300
}

export const getDataOrNullTransformer: AxiosResponseTransformer = (data, _, status) => 
  isOkStatusCode(status) ? data : null

export function isOkResponse(response: AxiosResponse): boolean {
  return response.status >= 200 && response.status < 300
}

export function getDataIfOk<T>(response: AxiosResponse<T>): T | null {
  return isOkResponse(response) ? response.data : null
}

export class AxiosRequestConfigBuilder {
  private config: AxiosRequestConfig = { }

  private constructor() { }

  static create(): AxiosRequestConfigBuilder {
    return new AxiosRequestConfigBuilder()
  }

  addContentTypeHeader(contentType: string): AxiosRequestConfigBuilder {
    if (this.config.headers) {
      this.config.headers = {
        ...this.config.headers,
        'Content-Type': contentType
      }
    } else {
      this.config.headers = {
        'Content-Type': contentType
      }
    }

    return this
  }

  addAcceptStatusCodes(...statuses: HttpStatusCode[]): AxiosRequestConfigBuilder {
    if (statuses) {
      this.config.validateStatus = (status) => statuses.includes(status)
    }

    return this
  }

  addResponseTransformers(...responseTransformers: AxiosResponseTransformer[]): AxiosRequestConfigBuilder {
    if (responseTransformers) {
      this.config.transformResponse = [ ...responseTransformers ]
    }

    return this
  }

  build(): AxiosRequestConfig {
    return this.config;
  }
}