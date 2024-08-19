import { PaginationResult } from '@/common/types'
import { PaginationResultDto } from '../dtos'

export const paginationResultDtoToPaginationResult = <T>(dto: PaginationResultDto<T>) => ({ ...dto } as PaginationResult<T>)
