import { CustomerType, AccountRole } from '@/common/types/account';

export interface AccountDto {
  id: number;
  createdAt: Date,
  email: string;
  fullName: string;
  dateOfBirth: Date;
  vechiclesNumber: number;
  customerType: CustomerType;
  accountRole: AccountRole;
}
