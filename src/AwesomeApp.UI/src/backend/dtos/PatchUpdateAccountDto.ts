import { CustomerType } from '@/common/types/account';

export interface PatchUpdateAccountDto {
  id: number;
  fullName: string;
  dateOfBirth: string;
  vehiclesNumber: number;
  customerType: CustomerType;
}
