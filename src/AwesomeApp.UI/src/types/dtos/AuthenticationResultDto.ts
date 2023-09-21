export interface AuthenticationResultDto {
  accountId?: number;
  accountRole?: number //EAccountRole? 
  authenticationSuccessful: boolean;
  authenticationErrorMessage?: string; 
}