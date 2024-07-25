import { Account } from '@/common/types/account'
import { AppPage, AppPageTitle } from '@/frontend/views'
import { ReactElement, useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useFetchWithErrorHandling } from '@/frontend/hooks'
import { fetchAccounts } from '@/frontend/libs'
import useSWR from 'swr'

type Props = { 
  account: Account;
}

const pageSizeOptions = [
  5,
  10,
  20,
  100
]

const columns = [
  {
    field: 'id',
    headerName: 'ID',
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    flex: 1
  },
  {
    field: 'accountRole',
    headerName: 'Role',
    flex: 1
  },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false
  },
] as GridColDef[]

function useFetchAccountsWithErrorHandling(pageNumber: number, pageSize: number) {
  return useSWR(
    'fetchAccounts',
    useFetchWithErrorHandling(
      () => fetchAccounts({ pageNumber, pageSize })
    )
  )
}
  
export default function Accounts({ account }: Readonly<Props>): ReactElement {

  // const [items, setItems] = useState<Account[]>([])
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  // const [totalCount, setTotalCount] = useState<number>(0)

  const { data } = useFetchAccountsWithErrorHandling(pageNumber, pageSize)

  // useEffect(
  //   () => {
  //     tryFetchAccounts({ pageNumber, pageSize }).then(paginationResult => {
  //       setItems(paginationResult.items)
  //       setPageNumber(paginationResult.pageNumber)
  //       setPageSize(paginationResult.pageSize)
  //       setTotalCount(paginationResult.totalCount)
  //     })
  //   },
  //   [tryFetchAccounts, pageNumber, pageSize]
  // )

  return (
    <AppPage account={account}>
      <AppPageTitle>Manage accounts</AppPageTitle>
      <DataGrid
        rows={data?.items}
        columns={columns}
        pageSizeOptions={pageSizeOptions}
        rowCount={data?.totalCount}
        disableColumnMenu
        disableColumnResize
      />
    </AppPage>
  )
}