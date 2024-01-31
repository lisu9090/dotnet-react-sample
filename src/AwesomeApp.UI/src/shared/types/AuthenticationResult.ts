import { AccountRole } from ".";

export interface AuthenticationResult {
  accountId?: number;
  accountRole?: AccountRole;
  authenticationSuccessful: boolean;
  authenticationErrorMessage?: string; 
}