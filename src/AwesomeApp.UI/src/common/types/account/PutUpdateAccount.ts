import { AccountRole } from './AccountRole';
import { CustomerType } from './CustomerType';

export interface PutUpdateAccount {
  email: string;
  password: string;
  fullName: string;
  dateOfBirth: string;
  vehiclesNumber: number;
  customerType: CustomerType;
  accountRole: AccountRole;
}
