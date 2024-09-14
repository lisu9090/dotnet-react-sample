import { PaginationResult } from '@/common/types'
import { PaginationResultDto } from '../dtos'

/**
 * Maps PaginationResultDto to PaginationResult
 * @param dto PaginationResultDto
 * @returns PaginationResult
 */
export const paginationResultDtoToPaginationResult = <T>(dto: PaginationResultDto<T>) => ({ ...dto } as PaginationResult<T>)
