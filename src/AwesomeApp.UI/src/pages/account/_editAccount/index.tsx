import { Account } from "@/common/types/account"
import { PageBox } from "@/frontend/components"

type Props = {
  account: Account
}

export default function EditAccountComponent({ account }: Readonly<Props>) {
  return (
    <PageBox>{account.id}</PageBox>
  )
}