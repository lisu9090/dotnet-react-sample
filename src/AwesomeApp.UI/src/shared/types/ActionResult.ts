export interface ActionResult<T> {
  payload: T | null | undefined;
  success: boolean;
  errorCode: string;
}
