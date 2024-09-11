import { CustomerType, AccountRole } from '@/common/types/account';

/**
 * Model of Account
 */
export interface Account {
  id: number;
  email: string;
  fullName: string;
  dateOfBirth: string;
  vehiclesNumber: number;
  customerType: CustomerType;
  accountRole: AccountRole;
}
