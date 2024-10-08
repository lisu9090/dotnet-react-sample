import { CustomerType } from './CustomerType'

/**
 * Model to partially update Account
 */
export interface PatchUpdateAccount {
  fullName?: string;
  dateOfBirth?: string;
  vehiclesNumber?: number;
  customerType?: CustomerType;
}
