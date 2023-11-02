export interface AuthenticationResultDto {
  accountId?: number;
  accountRole?: number;
  authenticationSuccessful: boolean;
  authenticationErrorMessage?: string; 
}