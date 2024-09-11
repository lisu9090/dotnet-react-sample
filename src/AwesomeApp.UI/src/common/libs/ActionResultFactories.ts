import { ActionResult, ActionResultBase } from '@/common/types'

/**
 * Creates ActionResultBase indicating success 
 * @returns ActionResultBase instance
 */
export function createSucessfulActionResultBase(): ActionResultBase {
  return {
    success: true,
  }
}

/**
 * Creates ActionResultBase indicating failure
 * @param errorCode Error code
 * @returns ActionResultBase instance
 */
export function createFailedActionResultBase(errorCode: string): ActionResultBase {
  return {
    success: false,
    errorCode: errorCode
  }
}

/**
 * Creates ActionResult indicating success and containing data
 * @param payload Data
 * @returns ActionResult instance
 */
export function createSucessfulActionResult<T>(payload: T): ActionResult<T> {
  return {
    ...createSucessfulActionResultBase(),
    payload: payload,
  }
}

/**
 * Creates ActionResult indicating failure with optional data
 * @param errorCode Error code
 * @param payload Optional data
 * @returns ActionResult instance
 */
export function createFailedActionResult<T>(errorCode: string, payload?: T): ActionResult<T> {
  return {
    ...createFailedActionResultBase(errorCode),
    payload: payload ? payload : null,
  }
}