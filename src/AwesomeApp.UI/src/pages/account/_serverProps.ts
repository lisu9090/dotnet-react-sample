import { ensureAuthorized } from "@/frontend/libs";

export const getServerSideProps = ensureAuthorized((_, session) => ({ props: { user: session.user} }))
