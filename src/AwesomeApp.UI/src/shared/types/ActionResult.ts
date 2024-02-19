export interface ActionResult<T> {
  payload: T | null;
  success: boolean;
  errorCode?: string;
}
