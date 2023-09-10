import { Grid, Paper } from "@mui/material"
import Image from "next/image"
import Link from "next/link"

export default function RootPage() {
  return (
    <>
      <Paper className="main-container">
        <div>Welcome to AwesomeApp</div>
        <Image src="next.svg" width={500} alt="Next logo"/>
        <Grid container spacing={2}>
          <Grid>
            <Link href="/create-account">Log In</Link>
          </Grid>
          <Grid>
            <span>or</span>
          </Grid>
          <Grid>
            <Link href="/create-account">Create Account</Link>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}