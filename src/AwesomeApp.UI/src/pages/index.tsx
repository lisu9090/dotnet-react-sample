import { Box, Button, Container, Grid, Paper } from "@mui/material"
import Image from "next/image"
import Link from "next/link"

export default function RootPage() {
  return (
    <Grid 
      container 
      className="page-container"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={6}>
        <Paper>
          <Grid 
            container 
            spacing={2} 
            padding={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid 
              item 
              container 
              xs={12} 
              justifyContent="center"
            >
              <span>Welcome to AwesomeApp</span>
            </Grid>
            <Grid 
              item 
              container 
              xs={12} 
              justifyContent="center"
            >
              <Image src="next.svg" width={500} height={500} alt="Next logo"/>
            </Grid>
            <Grid 
              item 
              container 
              xs={4} 
              justifyContent="center"
            >
              <Link href="/create-account">
                <Button variant="outlined">Log In</Button>
              </Link>
            </Grid>
            <Grid 
              item 
              container 
              xs={4} 
              justifyContent="center"
            >
              <span>or</span>
            </Grid>
            <Grid 
              item 
              container 
              xs={4} 
              justifyContent="center"
            >
              <Link href="/create-account">
                <Button variant="outlined">Create Account</Button>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

    </Grid>
  )
}