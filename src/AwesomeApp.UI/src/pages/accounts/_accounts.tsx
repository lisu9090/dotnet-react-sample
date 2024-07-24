import { Account } from '@/common/types/account';
import { AppPage, AppPageTitle } from '@/frontend/views'
import { ReactElement } from 'react'

type Props = { 
  account: Account;
}

export default function Accounts({ account }: Readonly<Props>): ReactElement {
  return (
    <AppPage account={account}>
      <AppPageTitle>Manage accounts</AppPageTitle>
    </AppPage>
  )
}