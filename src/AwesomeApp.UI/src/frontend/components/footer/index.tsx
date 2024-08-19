import { Paper, Typography } from '@mui/material'
import { ReactElement } from 'react'

type Props = {
  content: string;
}

export function Footer({ content }: Readonly<Props>): ReactElement {
  return (
    <Paper 
      className="w-full p-6 pt-1 pb-1"
      variant="outlined" 
      square 
    >
      <Typography variant="caption">{ content }</Typography>
    </Paper>
  )
}