import { Grid, Paper } from '@mui/material'
import styles from './styles.module.css'
import { ReactNode } from 'react'

export function PageBox({ children }: Readonly<{ children: ReactNode }>) {
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
        className={styles.mainBox}
      >
        <Paper className="p-6">
          { children }
        </Paper>
      </Grid>
    </Grid>
  )
}