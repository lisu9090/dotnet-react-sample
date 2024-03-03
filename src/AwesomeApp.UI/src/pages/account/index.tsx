import { ensureAuthorized } from "@/frontend/libs";
import { Typography } from "@mui/material";
import { ReactElement } from "react";

export const getServerSideProps = ensureAuthorized()

export default function Account(): ReactElement {
  return (
    <>
      <Typography variant="h5">Account Works!</Typography>
    </>
  )
}
