import { Account } from '@/common/types/account'
import { AccountDto, AccountSessionDto } from '../dtos'
import { User } from 'next-auth'

export const accountDtotoAccount = (dto: AccountDto) => ({
  accountRole: dto.accountRole,
  createdAt: dto.createdAt,
  customerType: dto.customerType,
  dateOfBirth: dto.dateOfBirth,
  email: dto.email,
  fullName: dto.fullName,
  id: dto.id,
  vehiclesNumber: dto.vehiclesNumber,
} as Account)

export const accountDtostoAccounts = (dtos: AccountDto[]) => dtos.map(accountDtotoAccount)

export const accountSessionDtotoUser = (dto: AccountSessionDto) => ({
  id: dto.id,
  email: dto.email,
  name: dto.fullName,
  role: dto.accountRole,
} as User)