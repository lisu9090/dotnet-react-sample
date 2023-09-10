import Link from "next/link"

export default function RootPage() {
  return (
    <>
      <div>This is root page</div>
      <Link href="/create-account">Create Account</Link>
    </>
  )
}