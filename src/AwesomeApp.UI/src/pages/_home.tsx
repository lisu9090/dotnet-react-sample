import { PAGE_CREATE_ACCOUNT, PAGE_LOGIN } from '@/common/consts'
import { Account } from '@/common/types/account'
import { AppPage, AppPageTitle } from '@/frontend/views'
import { Button, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'

type Props = {
  account?: Account;
}

/**
 * Home Page Component
 * @param account User account data 
 * @returns Page Component 
 */
export default function HomePage({ account }: Readonly<Props>): ReactElement {
  return (
    <AppPage account={account}>
      <Grid
        container
        spacing={6}
        padding={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          item
          container
          justifyContent="center"
        >
          <AppPageTitle>Welcome to AwesomeApp</AppPageTitle>
        </Grid>
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption" className="mb-2">Powered by</Typography>
          <Image
            src="next.svg"
            width={500}
            height={500}
            alt="Next logo"
          />
        </Grid>
        {!account && (
          <Grid
            item
            container
            justifyContent="center"
          >
            <Grid
              item
              container
              xs={4}
              direction="column"
              alignItems="stretch"
            >
              <Link href={PAGE_CREATE_ACCOUNT}>
                <Button className="w-full" variant="outlined">Create Account</Button>
              </Link>
            </Grid>
            <Grid
              item
              container
              xs={1}
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="caption">or</Typography>
            </Grid>
            <Grid
              item
              container
              xs={4}
              direction="column"
              alignItems="stretch"
            >
              <Link href={PAGE_LOGIN}>
                <Button className="w-full" variant="outlined">Login</Button>
              </Link>
            </Grid>
          </Grid>
        )}
      </Grid>
    </AppPage>
  )
}
