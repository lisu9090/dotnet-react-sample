import { AccountRole, CustomerType } from '@/common/types/account'

/**
 * DTO to create or update Account
 */
export interface PutUpdateAccountDto {
  id: number;
  email: string;
  password: string;
  fullName: string;
  dateOfBirth: string;
  vehiclesNumber: number;
  customerType: CustomerType;
  accountRole: AccountRole;
}
