import { CustomerType, AccountRole } from "@/shared/types";

export interface AccountDto {
  id: number;
  createdAt: Date,
  email: string;
  fullName: string;
  dateOfBirth: Date;
  vechiclesNumber: number;
  customerType: CustomerType;
  accountRole: AccountRole;
}
