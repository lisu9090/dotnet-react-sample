import { Account, AccountRole, CustomerType } from '@/common/types/account'
import { Grid, Typography } from '@mui/material'
import { ReactElement } from 'react'
import { AppPage, AppPageTitle } from '@/frontend/views'
import { Trans } from 'react-i18next'

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
      <AppPageTitle>
        <Trans>Account dashboard</Trans>
      </AppPageTitle>
      <Grid
        item
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Typography variant="h6">
          <Trans>Email</Trans>
        </Typography>
        <span className="mb-2">{account.email}</span>
        <Typography variant="h6">
          <Trans>Full name</Trans>
        </Typography>
        <span className="mb-2">{account.fullName}</span>
        <Typography variant="h6">
          <Trans>Date of birth</Trans>
        </Typography>
        <span className="mb-2">{dateOfBirth.toLocaleDateString()}</span>
        <Typography variant="h6">
          <Trans>Number of vehicles</Trans>
        </Typography>
        <span className="mb-2">{account.vehiclesNumber}</span>
        <Typography variant="h6">
          <Trans>Customer type</Trans>
        </Typography>
        <span className="mb-2">{customerTypeName}</span>
        <Typography variant="h6">
          <Trans>Account role</Trans>
        </Typography>
        <span className="mb-2">{roleName}</span>
      </Grid>
    </AppPage>
  )
}
