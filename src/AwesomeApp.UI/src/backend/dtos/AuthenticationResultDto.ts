import { AccountSessionDto } from './AccountSessionDto';

export interface AuthenticationResultDto {
  account?: AccountSessionDto;
  authenticationSuccessful: boolean;
  authenticationErrorMessage?: string; 
}