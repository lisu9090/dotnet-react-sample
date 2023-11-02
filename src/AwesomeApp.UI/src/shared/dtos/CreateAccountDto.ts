import { CustomerType } from "@/shared/models";

export interface CreateAccountDto {
  email: string;
  password: string;
  fullName: string;
  dateOfBirth: Date;
  vechiclesNumber: number;
  customerType: CustomerType;
}
