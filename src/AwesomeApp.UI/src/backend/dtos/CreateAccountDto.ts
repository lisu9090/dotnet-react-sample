import { AccountRole, CustomerType } from '@/common/types/account'

/**
 * DTO to create Account
 */
export interface CreateAccountDto {
  email: string;
  password: string;
  fullName: string;
  dateOfBirth: string;
  vehiclesNumber: number;
  customerType: CustomerType;
  accountRole: AccountRole;
}
