import React from 'react'
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic'
import WorkIcon from '@material-ui/icons/Work'
import AnnouncementIcon from '@material-ui/icons/Announcement'
import { makeStyles } from '@material-ui/core/styles'
import { ListItemIcon, ListItemText, MenuItem, SvgIcon } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  iconMask: {
    '-webkit-filter': `invert(${theme.palette.type === 'dark' ? '100' : '0'}%)`,
    '-moz-filter': `invert(${theme.palette.type === 'dark' ? '100' : '0'}%)`,
    '-ms-filter': `invert(${theme.palette.type === 'dark' ? '100' : '0'}%)`,
    '-o-filter': `invert(${theme.palette.type === 'dark' ? '100' : '0'}%)`,
    filter: `invert(${theme.palette.type === 'dark' ? '100' : '0'}%)`,
  },
  root: {
    width: '100%',
    display: 'flex',
    padding: '5px 0px',
    flexDirection: 'column',
    boxSizing: 'border-box',

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

      '& img': {
        height: 20,
        width: 20,
      },

      '& .MuiListItemText-root': {
        margin: 0,
      },
    },
  },
}))

export default function ForthBlock({ handleClose }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Link to="/support" onClick={handleClose}>
        <MenuItem >
          <ListItemIcon>
            <HeadsetMicIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Chat support' />
        </MenuItem>
      </Link>

      <Link to="/careers" onClick={handleClose}>
        <MenuItem >
          <ListItemIcon>
            <WorkIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Work with us' />
        </MenuItem>
      </Link>

      <Link to="/about" onClick={handleClose}> 
        <MenuItem >
          <ListItemIcon>
            <AnnouncementIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='About us' />
        </MenuItem>
      </Link>
    </div>
  )
}
