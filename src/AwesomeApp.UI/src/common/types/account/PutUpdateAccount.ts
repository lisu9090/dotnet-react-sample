import { AccountRole } from './AccountRole'
import { CustomerType } from './CustomerType'

/**
 * Model to update or create Account
 */
export interface PutUpdateAccount {
  id: number;
  email: string;
  password: string;
  fullName: string;
  dateOfBirth: string;
  vehiclesNumber: number;
  customerType: CustomerType;
  accountRole: AccountRole;
}
