import { AccountRole } from "../types";

export interface AuthenticationResultDto {
  accountId?: number;
  accountRole?: AccountRole;
  authenticationSuccessful: boolean;
  authenticationErrorMessage?: string; 
}