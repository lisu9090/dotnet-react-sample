/**
 * Generic basic action result returned from backend endpoints; includes success indicator and optional error code
 */
export interface ActionResultBase {
  success: boolean;
  errorCode?: string;
}

/**
 * Generic action result returned from backend endpoints; includes data T, success indicator and optional error code
 */
export interface ActionResult<T> extends ActionResultBase {
  payload: T | null;
}
