import { Account } from '@/common/types/account';
import { AppPage, AppPageTitle } from '@/frontend/views'
import { ReactElement } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

type Props = { 
  account: Account;
}

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

export default function Accounts({ account }: Readonly<Props>): ReactElement {
  return (
    <AppPage account={account}>
      <AppPageTitle>Manage accounts</AppPageTitle>
      <DataGrid
        rows={[ account ]}
        columns={columns}
        disableColumnMenu
        disableColumnResize
      />
    </AppPage>
  )
}