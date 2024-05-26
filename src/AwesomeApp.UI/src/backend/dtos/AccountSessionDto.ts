import { AccountRole } from '@/common/types/account';

export interface AccountSessionDto {
  id: number;
  email: string;
  fullName: string;
  accountRole: AccountRole;
}