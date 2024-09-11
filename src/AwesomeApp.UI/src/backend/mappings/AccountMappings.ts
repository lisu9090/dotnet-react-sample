import { Account } from '@/common/types/account'
import { AccountDto, AccountSessionDto } from '../dtos'
import { User } from 'next-auth'

/**
 * Maps AccountDto to Account
 * @param dto AccountDto
 * @returns Account
 */
export const accountDtoToAccount = (dto: AccountDto) => ({
  accountRole: dto.accountRole,
  createdAt: dto.createdAt,
  customerType: dto.customerType,
  dateOfBirth: dto.dateOfBirth,
  email: dto.email,
  fullName: dto.fullName,
  id: dto.id,
  vehiclesNumber: dto.vehiclesNumber,
} as Account)

/**
 * Maps colletion of AccountDtos to colletion of Accounts
 * @param dtos Collection of AccountDtos
 * @returns Collection of Accounts
 */
export const accountDtosToAccounts = (dtos: AccountDto[]) => dtos.map(accountDtoToAccount)

/**
 * Maps AccountSessionDto to User
 * @param dto AccountSessionDto
 * @returns User
 */
export const accountSessionDtotoUser = (dto: AccountSessionDto) => ({
  id: dto.id,
  email: dto.email,
  name: dto.fullName,
  role: dto.accountRole,
} as User)