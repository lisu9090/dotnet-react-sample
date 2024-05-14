import { ActionResult } from "@/common/types";
import { Account } from "@/common/types/account";

export const responseDataToAccount = (data: any) => data 
  ? {
    ...data,
    dateOfBirth: new Date(data.dateOfBirth), 
  } as Account
  : null

export const responseDataToAccountsResult = (data: any) => data
  ? {
    ...data,
    payload: data.payload ? data.payload.map(responseDataToAccount) : data.payload
  } as ActionResult<Account[]>
  : null