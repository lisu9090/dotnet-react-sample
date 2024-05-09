import { Account } from "@/common/types";
import { AccountDto } from "../dtos";

export const toAccount = (dto: AccountDto) => ({
    accountRole: dto.accountRole,
    createdAt: dto.createdAt,
    customerType: dto.customerType,
    dateOfBirth: dto.dateOfBirth,
    email: dto.email,
    fullName: dto.fullName,
    id: dto.id,
    vechiclesNumber: dto.vechiclesNumber,
} as Account)

export const toAccountDto = (model: Account) => ({
    accountRole: model.accountRole,
    createdAt: model.createdAt,
    customerType: model.customerType,
    dateOfBirth: model.dateOfBirth,
    email: model.email,
    fullName: model.fullName,
    id: model.id,
    vechiclesNumber: model.vechiclesNumber,
} as AccountDto)

export const toAccounts = (dtos: AccountDto[]) => dtos?.map(toAccount) 