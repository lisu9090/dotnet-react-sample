import { Grid, Paper } from '@mui/material'
import styles from './styles.module.css'

export function PageBox({ children }: any) {
  return (
    <Grid
      container
      className="page-container"
      alignItems="center"
      justifyContent="center"
    >
      <Grid
        item
        xs={12}
        sm={10}
        md={6}
        className="main-box"
      >
        <Paper className="p-6">
          { children }
        </Paper>
      </Grid>
    </Grid>
  )
}