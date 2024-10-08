import { Account, AccountRole, CustomerType } from '@/common/types/account'
import { Grid, Typography } from '@mui/material'
import { ReactElement } from 'react'
import { AppPage, AppPageTitle } from '@/frontend/views'

type Props = { 
  account: Account;
}

/**
 * Account Page Component
 * @param account User account data
 * @returns Page Component
 */
export default function AccountPage({ account }: Readonly<Props>): ReactElement {
  const roleName = AccountRole[account.accountRole]
  const customerTypeName = CustomerType[account.customerType]
  const dateOfBirth = new Date(account.dateOfBirth)

  return (
    <AppPage account={account}>
      <AppPageTitle>Account dashboard</AppPageTitle>
      <Grid
        item
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Typography variant="h6">Email</Typography>
        <span className="mb-2">{account.email}</span>
        <Typography variant="h6">Full name</Typography>
        <span className="mb-2">{account.fullName}</span>
        <Typography variant="h6">Date of birth</Typography>
        <span className="mb-2">{dateOfBirth.toLocaleDateString()}</span>
        <Typography variant="h6">Number of vehicles</Typography>
        <span className="mb-2">{account.vehiclesNumber}</span>
        <Typography variant="h6">Customer type</Typography>
        <span className="mb-2">{customerTypeName}</span>
        <Typography variant="h6">Account role</Typography>
        <span className="mb-2">{roleName}</span>
      </Grid>
    </AppPage>
  )
}
