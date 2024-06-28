import { CircularProgress, Grid } from '@mui/material'
import styles from './styles.module.css'
import { ReactElement } from 'react'

type Props = {
  show: boolean
}

export function Spinner({ show }: Props): ReactElement | null {
  if(!show) {
    return null
  }

  return (
    <Grid 
      className={styles.spinnerContainer}
      container
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress size="4rem"/>
    </Grid>
  )
}