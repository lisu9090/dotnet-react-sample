import { Account, AccountRole } from '@/common/types/account'
import { AppPage, AppPageTitle } from '@/frontend/views'
import { ReactElement, useEffect, useMemo, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useCallWithErrorHandling, useFetchWithErrorHandling } from '@/frontend/hooks'
import { deleteAccount, fetchAccounts } from '@/frontend/libs'
import Link from 'next/link'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Button } from '@mui/material'
import { pageAccountEdit } from '@/common/consts'
import { useSnackbar } from '@/frontend/components'

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

function useFetchAccountsWithErrorHandling(pageNumber: number, pageSize: number) {
  return useFetchWithErrorHandling(
    { pageNumber, pageSize },
    fetchAccounts
  )
}

function useDeleteAccountWithErrorHandling() {
  return useCallWithErrorHandling(deleteAccount)
}

function ActionsCell({ id, refreshCallback }: { id: number, refreshCallback: () => void }): ReactElement {
  const { success } = useSnackbar()
  const tryDeleteAccount = useDeleteAccountWithErrorHandling()

  const onDelete = async (event: React.MouseEvent<HTMLElement>) => {
    if (await tryDeleteAccount(id)) {
      success(`Account (${id}) has been deleted`)
      refreshCallback()
    }

    event.stopPropagation()
    event.preventDefault()
  }

  return (
    <>
      <Link href={pageAccountEdit(id)}>
        <Button className="p-0 min-w-0 mr-3">
          <ManageAccountsIcon />
        </Button>
      </Link>
      <Button 
        className="p-0 min-w-0" 
        color="error"
        onClick={onDelete}
      >
        <DeleteForeverIcon />
      </Button>
    </>
  )
}
  
export default function Accounts({ account }: Readonly<Props>): ReactElement {
  const initialPageSize = useMemo(() => Number.parseInt(localStorage.getItem(pageSizeStorageKey) ?? '') || defaultPageSize, [])

  const [paginationModel, setPaginationModel] = useState<PageOptions>({
    page: 1,
    pageSize: initialPageSize
  })

  const [accountsPaginationResult, mutator] = useFetchAccountsWithErrorHandling(paginationModel.page, paginationModel.pageSize)

  const columns = useMemo(
    () => [
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
        renderCell: ({ id }) => <ActionsCell id={id as number} refreshCallback={mutator} />
      },
    ] as GridColDef[],
    [mutator]
  )

  useEffect(
    () => localStorage.setItem(pageSizeStorageKey, paginationModel.pageSize.toString()),
    [paginationModel.pageSize]
  )

  return (
    <AppPage account={account}>
      <AppPageTitle>Manage accounts</AppPageTitle>
      <DataGrid
        columns={columns}
        rows={accountsPaginationResult?.items}
        pageSizeOptions={pageSizeOptions}
        rowCount={accountsPaginationResult?.totalCount}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        paginationMode="server"
        disableColumnMenu
        disableColumnResize
        disableRowSelectionOnClick
      />
    </AppPage>
  )
}