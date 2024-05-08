import { HttpStatusCode, AxiosRequestConfig, AxiosResponse } from "axios";

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

export function isOkResponse(response: AxiosResponse): boolean {
  return response.status >= 200 && response.status < 300
}

export function getDataIfOk<T>(response: AxiosResponse<T>): T | null {
  return isOkResponse(response) ? response.data : null
}