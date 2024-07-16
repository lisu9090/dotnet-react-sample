import classes from './styles.module.css'
import { PAGE_HOME } from '@/common/consts'
import { NextIcon } from '@/frontend/components'
import { Typography } from '@mui/material'
import Link from 'next/link'
import { ReactElement } from 'react'

export function Logo(): ReactElement {
  return (
    <Link href={PAGE_HOME}>
      <Typography
        className={`${classes.logoText} mr-3`}
        variant="h6"
        noWrap
      >
        <NextIcon width="2rem" height="2rem" />
        AwesomeApp
      </Typography>
    </Link>
  )
}