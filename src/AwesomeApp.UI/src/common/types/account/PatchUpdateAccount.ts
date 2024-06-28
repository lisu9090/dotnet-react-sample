import { CustomerType } from './CustomerType';

export interface PatchUpdateAccount {
  fullName?: string;
  dateOfBirth?: string;
  vehiclesNumber?: number;
  customerType?: CustomerType;
}
