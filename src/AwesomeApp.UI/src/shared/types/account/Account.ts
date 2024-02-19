import { CustomerType, AccountRole } from "@/shared/types";

export interface Account {
  id: number;
  createdAt: Date,
  email: string;
  fullName: string;
  dateOfBirth: Date;
  vechiclesNumber: number;
  customerType: CustomerType;
  accountRole: AccountRole;
}
