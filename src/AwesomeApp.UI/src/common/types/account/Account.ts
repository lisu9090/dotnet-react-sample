import { CustomerType, AccountRole } from '@/common/types/account';

export interface Account {
  id: number;
  email: string;
  fullName: string;
  dateOfBirth: Date;
  vehiclesNumber: number;
  customerType: CustomerType;
  accountRole: AccountRole;
}
