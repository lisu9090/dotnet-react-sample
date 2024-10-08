import { CustomerType, AccountRole } from '@/common/types/account'

/**
 * DTO describing Account
 */
export interface AccountDto {
  id: number;
  createdAt: string,
  email: string;
  fullName: string;
  dateOfBirth: string;
  vehiclesNumber: number;
  customerType: CustomerType;
  accountRole: AccountRole;
}
