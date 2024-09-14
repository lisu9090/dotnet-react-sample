import { AccountSessionDto } from './AccountSessionDto'

/**
 * DTO describing result of user authentication
 */
export interface AuthenticationResultDto {
  account?: AccountSessionDto;
  authenticationSuccessful: boolean;
  authenticationErrorMessage?: string; 
}