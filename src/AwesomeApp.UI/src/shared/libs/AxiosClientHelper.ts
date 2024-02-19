import { HttpStatusCode, AxiosRequestConfig, AxiosResponse } from "axios";

export function acceptStatusCodes(statuses: HttpStatusCode[]): AxiosRequestConfig {
  return {
    validateStatus: (status) => statuses.includes(status)   
  }
}

export function isOkResponse(response: AxiosResponse): boolean {
  return response.status >= 200 && response.status < 300
}