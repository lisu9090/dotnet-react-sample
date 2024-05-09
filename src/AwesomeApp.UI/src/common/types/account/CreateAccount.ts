import { CustomerType } from './CustomerType';

export interface CreateAccount {
  email: string;
  password: string;
  fullName: string;
  dateOfBirth: Date;
  vechiclesNumber: number;
  customerType: CustomerType;
}
