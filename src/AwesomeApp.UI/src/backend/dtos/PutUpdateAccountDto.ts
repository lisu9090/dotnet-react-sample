import { AccountRole, CustomerType } from '@/common/types/account';

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
