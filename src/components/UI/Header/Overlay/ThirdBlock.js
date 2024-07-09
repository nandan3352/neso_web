import React from 'react'
import SettingsIcon from '@material-ui/icons/Settings'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import { makeStyles } from '@material-ui/core/styles'
import { ListItemIcon, ListItemText, MenuItem, Switch } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    padding: '5px 0px',
    borderBottom: '1px solid rgba(var(--theme-divider))',

    '& li': {
      height: 24,

      '& .MuiListItemIcon-root': {
        height: 24,
        width: 24,
        alignItems: 'center',

        '& .MuiSvgIcon-root': {
          height: 20,
          width: 20,
        },
      },

      '& .MuiListItemText-root': {
        margin: 0,
      },
    },

    '& .Muiswitch-colorSecondary.Mui-checked + .Muiswitch-track': {
      background: theme.palette.secondary.main,
    },
  },
}))

export default function ThirdBlock({ darkMode, handleClose }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Link to='/settings' onClick={handleClose}>
        <MenuItem >
          <ListItemIcon>
            <SettingsIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Settings' />
        </MenuItem>
      </Link>
      <MenuItem>
        <ListItemIcon>
          <WbSunnyIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText primary='Dark mode' />
        <Switch checked={darkMode.enabled} onChange={darkMode.handle} inputProps={{ 'aria-label': 'primary checkbox' }} />
      </MenuItem>
    </div>
  )
}
