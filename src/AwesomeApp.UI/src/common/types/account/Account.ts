import { CustomerType, AccountRole } from '@/common/types/account';

export interface Account {
  id: number;
  email: string;
  fullName: string;
  dateOfBirth: string;
  vehiclesNumber: number;
  customerType: CustomerType;
  accountRole: AccountRole;
}
