import styles from './styles.module.css'
import { Paper } from '@mui/material'
import { ReactNode } from 'react'

export function PageBox({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Paper className={`${styles.mainBox} p-6`}>
      { children }
    </Paper>
  )
}