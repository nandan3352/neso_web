import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import User from './User/User'
import SecondBlock from './SecondBlock'
import ThirdBlock from './ThirdBlock'
import ForthBlock from './ForthBlock'
import { Fade } from '@material-ui/core'
import { useNavigate } from 'react-router'

const StyledMenu = withStyles({
  paper: {
    width: 320,
    transition: 'all 225ms ease-in !important',
    border: '1px solid rgba(var(--theme-overlay-border))',
    top: '59px !important',
    left: '70% !important',
    right: 152,
    borderRadius: '0px 0px 4px 4px',

    '& > ul': {
      padding: 0,

      '& li': {
        padding: '19px 20px',
      },
    },
  },
})((props) => (
  <Menu
    disableScrollLock
    elevation={0}
    TransitionComponent={Fade}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))

const StyledMenuItem = withStyles((theme) => ({
  root: {},
}))(MenuItem)

export default function UserAccountOverlay({
  anchorEl,
  handleClose,
  darkMode,
}) {


  return (
    <div>
      <StyledMenu
        id='customized-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <>
          <User handleClose={handleClose} />
        </>
        <>
          <SecondBlock handleClose={handleClose} />
        </>
        <>
          <ThirdBlock handleClose={handleClose} darkMode={darkMode} />
        </>
        <>
          <ForthBlock handleClose={handleClose} />
        </>
      </StyledMenu>
    </div>
  )
}
