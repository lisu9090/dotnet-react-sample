import { PageBox } from "@/frontend/components";
import { Account, AccountRole } from "@/common/types";
import { Grid, TextField, Typography } from "@mui/material";
import { ReactElement } from "react";

export default function AccountComponent({ account }: { account: Account }): ReactElement {
  const roleName = AccountRole[account.accountRole]
  
  return (
    <PageBox>
      <Typography 
        variant="h5" 
        className="mb-2"
      >
        Account Details
      </Typography>
      <Grid
        item
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <TextField
          disabled
          className="mb-2"
          type="email"
          label="Email"
          placeholder="you@inbox.com"
          variant="standard"
          value={account.email}
        />
        <TextField
          disabled
          className="mb-2"
          type="text"
          label="Full name"
          placeholder="Jane Doe"
          variant="standard"
          value={account.fullName}
        />
        <TextField
          disabled
          className="mb-2"
          type="text"
          label="Role"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          value={roleName}
        />
      </Grid>
    </PageBox>
  )
}
