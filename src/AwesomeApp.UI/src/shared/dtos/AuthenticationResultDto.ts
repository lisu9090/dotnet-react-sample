import { AccountRole } from "../models";

export interface AuthenticationResultDto {
  accountId?: number;
  accountRole?: AccountRole;
  authenticationSuccessful: boolean;
  authenticationErrorMessage?: string; 
}