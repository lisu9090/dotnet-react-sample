import { Account } from "@/common/types/account"
import { PageBox } from "@/frontend/components"

type Props = {
  account: Account
}

export default function EditAccountPage({ account }: Readonly<Props>) {
  return (
    <PageBox>{account.id}</PageBox>
  )
}