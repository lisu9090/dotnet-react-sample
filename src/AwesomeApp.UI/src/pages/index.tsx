import { PageBox } from "@/frontend/components"
import { Button, Grid, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  return (
    <PageBox>
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
            <Link href="/log-in">
              <Button className="w-full" variant="outlined">Log In</Button>
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
            <Link href="/create-account">
              <Button className="w-full" variant="outlined">Create Account</Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </PageBox>
  )
}