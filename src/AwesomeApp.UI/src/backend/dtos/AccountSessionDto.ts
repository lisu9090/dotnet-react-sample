import { AccountRole } from "@/shared/types";

export interface AccountSessionDto {
  id: number;
  email: string;
  fullName: string;
  accountRole: AccountRole;
}