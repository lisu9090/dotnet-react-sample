import { ReactElement } from "react";
import { Snackbar as MuiSnackbar, SnackbarOrigin } from "@mui/material";

type Props = {
  open: boolean;
  message: string;
  handleClose: () => void;
  color?: string;
}

const autoHideDuration = 3000
const anchor = {
  vertical: 'bottom', 
  horizontal: 'right'
} as SnackbarOrigin

export function Snackbar({ open, message, color, handleClose }: Props): ReactElement | null{
  const shouldOpen = open && !!message
  
  return (
    <MuiSnackbar
      open={shouldOpen}
      message={message}
      color={color}
      anchorOrigin={anchor}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    />
  )
}