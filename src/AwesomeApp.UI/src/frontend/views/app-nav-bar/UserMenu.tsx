import styles from './styles.module.css'
import { PAGE_ACCOUNT_EDIT, PAGE_CREATE_ACCOUNT, PAGE_HOME, PAGE_LOGIN } from '@/common/consts';
import { Account } from '@/common/types/account'
import { useCallWithErrorHandling } from '@/frontend/hooks';
import { logoutUser } from '@/frontend/libs';
import { Box, IconButton, Avatar, Menu, MenuItem } from '@mui/material'
import { lightBlue } from '@mui/material/colors';
import { getCsrfToken } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react'

type Props = {
  account?: Account;
}

function useLogoutUserWithErrorHandling() {
  return useCallWithErrorHandling(logoutUser)
}

/**
 * User's actions menu Component
 * @param account User account data
 * @returns Component
 */
export function UserMenu({ account }: Readonly<Props>): ReactElement {
  const router = useRouter()
  const tryLogout = useLogoutUserWithErrorHandling()

  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const getUserAvatar = () => {
    return account?.fullName.substring(0, 1)
  }

  const logout = async () => {
    const authCsrfToken = await getCsrfToken()
    const result = await tryLogout(authCsrfToken)

    if (result) {
      router.push(PAGE_HOME)
      handleCloseUserMenu()
    }
  }
  
  return (
    <Box>
      <IconButton onClick={handleOpenUserMenu}>
        <Avatar sx={{ bgcolor: account ? lightBlue[900] : undefined }}>{getUserAvatar()}</Avatar>
      </IconButton>

      {!account && (
        <Menu
          anchorEl={anchorElUser}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          keepMounted
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <Link href={PAGE_LOGIN}>
            <MenuItem>
              Login
            </MenuItem>
          </Link>
          <Link href={PAGE_CREATE_ACCOUNT}>
            <MenuItem>
              Create Account
            </MenuItem>
          </Link>
        </Menu>
      )}
      {!!account && (
        <Menu
          keepMounted
          anchorEl={anchorElUser}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <Link href={PAGE_ACCOUNT_EDIT}>
            <MenuItem>
              Settings
            </MenuItem>
          </Link>
          <MenuItem onClick={logout}>
            Logout
          </MenuItem>
        </Menu>
      )}
    </Box>
  )
}