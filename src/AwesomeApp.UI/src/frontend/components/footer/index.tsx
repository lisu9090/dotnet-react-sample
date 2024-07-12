import { Paper, Typography } from '@mui/material'
import { ReactElement } from 'react'

export function Footer(): ReactElement {
  return (
    <Paper 
      className="w-full p-6 pt-1 pb-1"
      variant="outlined" 
      square 
    >
      <Typography variant="caption" >AwesomeApp, 2024 - App footer</Typography>
    </Paper>
  )
}