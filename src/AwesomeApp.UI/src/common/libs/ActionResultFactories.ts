import { ActionResult } from "@/common/types";

export function createSucessfulActionResult<T>(payload: T): ActionResult<T> {
  return {
    payload: payload,
    success: true,
  }
}

export function createFailedActionResult<T>(errorCode: string, payload?: T): ActionResult<T> {
  return {
    payload: payload ? payload : null,
    success: false,
    errorCode: errorCode
  }
}