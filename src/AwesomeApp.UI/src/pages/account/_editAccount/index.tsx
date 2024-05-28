import { Account } from "@/common/types/account"

type Props = {
  account: Account
}

export default function EditAccountComponent({ account }: Readonly<Props>) {
  return (
    <>{account.id}</>
  )
}