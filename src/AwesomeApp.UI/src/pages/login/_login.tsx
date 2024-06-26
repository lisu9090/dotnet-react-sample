import { PageBox } from "@/frontend/components"
import { loginUser } from "@/frontend/libs"
import { Button, Grid, TextField, Typography } from "@mui/material"
import Link from "next/link"
import { ReactElement, useState } from "react"
import { useCallWithErrorHandling, useAppSnackbar } from "@/pages/_hooks"
import { useRouter } from "next/router"
import { PAGE_ACCOUNT, PAGE_CREATE_ACCOUNT, QUERY_RETURN_URL } from "@/common/consts"
import { ParsedUrlQuery } from "querystring"
import { getCsrfToken } from "next-auth/react"

function validateReturnUrlOrigin (url: string | undefined) {
  if (!url) {
    return false
  }

  if (url.startsWith('/')) {
    return true
  }

  try {
    return new URL(url).origin === location.origin
  }
  catch {
    return false
  }
}

function getReturnUrl(query: ParsedUrlQuery) {
  let returnUrl: string = '' 
  const returnUrlQueryValue = query[QUERY_RETURN_URL]

  if (typeof returnUrlQueryValue === 'string') {
    returnUrl = returnUrlQueryValue
  }

  if (returnUrlQueryValue instanceof Array && returnUrlQueryValue.length > 0) {
    returnUrl = returnUrlQueryValue[0]
  } 

  return validateReturnUrlOrigin(returnUrl) ? returnUrl : null
}

function useLoginUserWithErrorHandling() {
  return useCallWithErrorHandling(loginUser)
}

export default function LoginPage(): ReactElement {
  const router = useRouter()
  const { warning } = useAppSnackbar()
  const tryLoginUser = useLoginUserWithErrorHandling()

  const [userEmail, setUserEmail] = useState<string>('')
  const [userPassword, setUserPassword] = useState<string>('')

  const login = async () => {
    if (!userEmail || !userPassword) {
      warning('Login failed. Email and password cannot be empty')

      return
    }

    const authCsrfToken = await getCsrfToken()

    const result = await tryLoginUser(
      {
        email: userEmail,
        password: userPassword
      },
      authCsrfToken
    )

    if (result) {
      router.replace(getReturnUrl(router.query) ?? PAGE_ACCOUNT)
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
              <Link className="mr-2" href={PAGE_CREATE_ACCOUNT}>
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