import { CircularProgress, Grid } from '@mui/material'
import styles from './styles.module.css'
import { ReactElement } from 'react'

type Props = {
  show: boolean
}

/**
 * Loading spinner Component
 * @param show indicates whether Component should be shown
 * @returns Component
 */
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