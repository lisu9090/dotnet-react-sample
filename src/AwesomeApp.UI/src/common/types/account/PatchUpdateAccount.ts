import { CustomerType } from './CustomerType';

/**
 * Model to partialy update Account
 */
export interface PatchUpdateAccount {
  fullName?: string;
  dateOfBirth?: string;
  vehiclesNumber?: number;
  customerType?: CustomerType;
}
