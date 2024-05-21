import { CustomerType } from './CustomerType';

export interface CreateAccount {
  email: string;
  password: string;
  fullName: string;
  dateOfBirth: string;
  vehiclesNumber: number;
  customerType: CustomerType;
}
