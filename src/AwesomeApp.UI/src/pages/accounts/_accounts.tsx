import { Account, AccountRole } from '@/common/types/account'
import { AppPage, AppPageTitle } from '@/frontend/views'
import { ReactElement, useEffect, useMemo, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useFetchWithErrorHandling } from '@/frontend/hooks'
import { fetchAccounts } from '@/frontend/libs'
import Link from 'next/link'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Button } from '@mui/material'
import { pageAccountEdit } from '@/common/consts'

type Props = { 
  account: Account;
}

type PageOptions = {
  page: number;
  pageSize: number;
}

const pageSizeOptions = [
  5,
  10,
  20,
  100
]

const pageSizeStorageKey = 'PageSizeOption'
const defaultPageSize = pageSizeOptions[3]

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
    flex: 1,
    renderCell: ({ value }) => AccountRole[value]
  },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    renderCell: ({ id }) => (
      <>
        <Link href={pageAccountEdit(id)}>
          <Button className="p-0 min-w-0 mr-3">
            <ManageAccountsIcon />
          </Button>
        </Link>
        <Button 
          className="p-0 min-w-0" 
          color="error"
        >
          <DeleteForeverIcon />
        </Button>
      </>
    )
  },
] as GridColDef[]

function useFetchAccountsWithErrorHandling(pageNumber: number, pageSize: number) {
  return useFetchWithErrorHandling(
    { pageNumber, pageSize },
    fetchAccounts
  )
}
  
export default function Accounts({ account }: Readonly<Props>): ReactElement {
  const initialPageSize = useMemo(() => Number.parseInt(localStorage.getItem(pageSizeStorageKey) ?? '') || defaultPageSize, [])

  const [paginationModel, setPaginationModel] = useState<PageOptions>({
    page: 1,
    pageSize: initialPageSize
  })

  const paginationResult = useFetchAccountsWithErrorHandling(paginationModel.page, paginationModel.pageSize)
  
  useEffect(
    () => localStorage.setItem(pageSizeStorageKey, paginationModel.pageSize.toString()),
    [paginationModel.pageSize]
  )

  return (
    <AppPage account={account}>
      <AppPageTitle>Manage accounts</AppPageTitle>
      <DataGrid
        columns={columns}
        rows={paginationResult?.items}
        pageSizeOptions={pageSizeOptions}
        rowCount={paginationResult?.totalCount}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        paginationMode="server"
        disableColumnMenu
        disableColumnResize
      />
    </AppPage>
  )
}