import { AccountRole } from "@/common/types";

export interface AccountSessionDto {
  id: number;
  email: string;
  fullName: string;
  accountRole: AccountRole;
}