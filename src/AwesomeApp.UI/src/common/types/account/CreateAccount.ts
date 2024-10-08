import { CustomerType } from './CustomerType'

/**
 * Model to create Account
 */
export interface CreateAccount {
  email: string;
  password: string;
  fullName: string;
  dateOfBirth: string;
  vehiclesNumber: number;
  customerType: CustomerType;
}
