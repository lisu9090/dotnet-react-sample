import { PageBox } from "@/frontend/components";
import { AccountRole } from "@/common/types";
import { Grid, TextField, Typography } from "@mui/material";
import { User } from "next-auth";
import { ReactElement } from "react";

export default function Account({ user }: { user: User }): ReactElement {
  const roleName = AccountRole[user.role]
  
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
          value={user.email}
        />
        <TextField
          disabled
          className="mb-2"
          type="text"
          label="Full name"
          placeholder="Jane Doe"
          variant="standard"
          value={user.name}
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
