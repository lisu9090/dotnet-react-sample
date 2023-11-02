import { AccountRole } from "@/shared/models";

export interface AuthenticationResultDto {
  accountId?: number;
  accountRole?: AccountRole;
  authenticationSuccessful: boolean;
  authenticationErrorMessage?: string; 
}