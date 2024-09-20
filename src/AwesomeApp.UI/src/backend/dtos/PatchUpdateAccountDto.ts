import { CustomerType } from '@/common/types/account'

/**
 * DTO to partially update Account
 */
export interface PatchUpdateAccountDto {
  id: number;
  fullName: string;
  dateOfBirth: string;
  vehiclesNumber: number;
  customerType: CustomerType;
}
