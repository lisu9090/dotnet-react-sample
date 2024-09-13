import { AccountRole } from '@/common/types/account'

/**
 * DTO containing basic Account data
 */
export interface AccountSessionDto {
  id: number;
  email: string;
  fullName: string;
  accountRole: AccountRole;
}