import { HttpStatusCode, AxiosRequestConfig } from "axios";

export function acceptStatusCodes(statuses: HttpStatusCode[]): AxiosRequestConfig {
  return {
    validateStatus: (status) => statuses.includes(status)   
  }
}
