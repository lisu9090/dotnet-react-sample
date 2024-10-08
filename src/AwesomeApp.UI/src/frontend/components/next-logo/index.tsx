import { ReactElement } from 'react'
import { SvgIcon } from '@mui/material'

type Props = {
  width: string;
  height: string;
}

/**
 * Brand logo icon Component
 * @param width Icon width
 * @param height Icon height
 * @returns Component
 */
export function NextIcon({ width, height }: Readonly<Props>): ReactElement {
  return (
    <SvgIcon style={{ width, height, marginTop: '-3px' }} className="mr-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74 64" height="22" >
        <path d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z" fill="currentColor"></path>
      </svg>
    </SvgIcon>
  )
}