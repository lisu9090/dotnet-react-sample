export interface ActionResultBase {
  success: boolean;
  errorCode?: string;
}

export interface ActionResult<T> extends ActionResultBase {
  payload: T | null;
}
