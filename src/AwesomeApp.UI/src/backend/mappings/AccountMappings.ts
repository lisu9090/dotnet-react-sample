import { Account } from '@/common/types/account';
import { AccountDto } from '../dtos';

export const toAccount = (dto: AccountDto) => ({
  accountRole: dto.accountRole,
  createdAt: dto.createdAt,
  customerType: dto.customerType,
  dateOfBirth: dto.dateOfBirth,
  email: dto.email,
  fullName: dto.fullName,
  id: dto.id,
  vehiclesNumber: dto.vehiclesNumber,
} as Account)

export const toAccounts = (dtos: AccountDto[]) => dtos.map(toAccount)
