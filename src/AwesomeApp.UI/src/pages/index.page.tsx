import { PAGE_CREATE_ACCOUNT, PAGE_LOGIN } from '@/common/consts'
import { AppPage } from '@/frontend/components'
import { Button, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'

export default function HomePage(): ReactElement {
  return (
    <AppPage>
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
          <Typography variant="h5">Welcome to AwesomeApp</Typography>
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
      </Grid>
    </AppPage>
  )
}