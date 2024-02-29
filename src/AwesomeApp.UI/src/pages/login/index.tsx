import { PageBox } from "@/frontend/components";
import { authenticateAccount } from "@/frontend/libs";
import { Button, Grid, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { ReactElement, useState } from "react";
import { useFetchWithErrorHandling, useSnackbar } from "@/pages/_hooks";
import { useRouter } from "next/router";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getSession } from "next-auth/react";

function useAuthenticateAccount() {
  return useFetchWithErrorHandling(authenticateAccount)
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{ }>> {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/account',
        permanent: false,
      }
    }
  }

  return {
    props: { }
  }
}

export default function Login(): ReactElement {
  const router = useRouter()
  const { warning } = useSnackbar()
  const authenticateAccount = useAuthenticateAccount()

  const [userEmail, setUserEmail] = useState<string>('')
  const [userPassword, setUserPassword] = useState<string>('')

  const login = async () => {
    if (!userEmail || !userPassword) {
      warning('Login failed. Email and password cannot be empty')

      return
    }

    const redirectUrl = await authenticateAccount({
      email: userEmail,
      password: userPassword
    })

    if (redirectUrl) {
        router.push(redirectUrl)
    } 
  }

  return (
    <PageBox>
      <form 
        onSubmit={(event: React.FormEvent) => {
          event.preventDefault()
          login()
        }}
      >
        <Grid
          container
          direction="column"
          alignContent="stretch"
          spacing={4}
        >
          <Grid item>
            <Typography variant="h5">Login to AwesomeApp</Typography>
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
                Login
              </Button>
            </Grid>
          </Grid>
          </Grid>
        </Grid>
      </form>
    </PageBox>
  )
}