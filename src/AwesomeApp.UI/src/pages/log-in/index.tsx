import { PageBox } from "@/frontend/components";
import { apiService } from "@/frontend/libs";
import { Button, Grid, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { useFetchWithErrorHandling } from "../_hooks";

function useAuthenticateAccount() {
  return useFetchWithErrorHandling(apiService.authenticateAccount)
}

export default function LogIn(): ReactElement {
  const router = useRouter()
  const authenticateAccount = useAuthenticateAccount()

  const [userEmail, setUserEmail] = useState<string>('')
  const [userPassword, setUserPassword] = useState<string>('')

  const logIn = async () => {
    if (!userEmail || !userPassword) {
      console.log('Log in error - email and password cannot be empty')

      return
    }

    const authenticationResult = await authenticateAccount({
      email: userEmail,
      password: userPassword
    })

    if (authenticationResult.authenticationSuccessful) {
      router.push('/account')
    }
  }

  return (
    <PageBox>
      <form 
        onSubmit={(event: React.FormEvent) => {
          event.preventDefault()
          logIn()
        }}
      >
        <Grid
          container
          direction="column"
          alignContent="stretch"
          spacing={4}
        >
          <Grid item>
            <Typography variant="h5">Log in to AwesomeApp</Typography>
          </Grid>
          <Grid 
            item 
            container 
            direction="column"
            alignContent="stretch"
          >
            <TextField
              className="mb-2"
              type="text"
              label="Email"
              value={userEmail}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUserEmail(event.target.value)}
            />
            <TextField
              type="password"
              label="Password"
              value={userPassword}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUserPassword(event.target.value)}
            />
          </Grid>
          <Grid 
            item
            container
            direction="column"
          >
          <Typography className="mt-6">Don&apos;t hane an account? Create one!</Typography>
          <Grid
            className="mt-2"
            item
            container
            alignItems="stretch"
            justifyContent="space-between"
          >
            <Grid item xs={4}>
              <Link className="mr-2" href="/create-account">
                <Button
                  className="w-full"
                  color="secondary"
                  variant="outlined"
                >
                  Create Account
                </Button>
              </Link>
            </Grid>
            <Grid item xs={4}>
              <Button
                className="w-full"
                type="submit"
                variant="outlined"
              >
                Log in
              </Button>
            </Grid>
          </Grid>
          </Grid>

        </Grid>
      </form>
    </PageBox>
  )
}