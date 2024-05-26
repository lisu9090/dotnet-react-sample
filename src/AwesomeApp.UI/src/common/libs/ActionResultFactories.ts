import { ActionResult, ActionResultBase } from '@/common/types'

export function createSucessfulActionResultBase(): ActionResultBase {
  return {
    success: true,
  }
}

export function createFailedActionResultBase(errorCode: string): ActionResultBase {
  return {
    success: false,
    errorCode: errorCode
  }
}

export function createSucessfulActionResult<T>(payload: T): ActionResult<T> {
  return {
    ...createSucessfulActionResultBase(),
    payload: payload,
  }
}

export function createFailedActionResult<T>(errorCode: string, payload?: T): ActionResult<T> {
  return {
    ...createFailedActionResultBase(errorCode),
    payload: payload ? payload : null,
  }
}