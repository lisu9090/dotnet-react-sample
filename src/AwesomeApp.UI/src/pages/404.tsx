import { PageBox } from "@/frontend/components";
import { Typography } from "@mui/material";
import { ReactElement } from "react";

export default function NotFound(): ReactElement {
  return (
    <PageBox>
      <Typography variant="h5">404 - Not found</Typography>
    </PageBox>
  )
}