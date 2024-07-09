import React from 'react'
import FaceIcon from '@material-ui/icons/Face'
import HistoryIcon from '@material-ui/icons/History'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import { makeStyles } from '@material-ui/core/styles'
import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core'
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
  },
}))

export default function SecondBlock({ handleClose }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Link to='/account' onClick={handleClose}>
        <MenuItem >
          <ListItemIcon>
            <FaceIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Account' />
        </MenuItem>
      </Link>
      <Link to='/purchases' onClick={handleClose}>
        <MenuItem >
          <ListItemIcon>
            <LocalOfferIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Purchases' />
        </MenuItem>
      </Link>
      <Link to='/history' onClick={handleClose}>
        <MenuItem >
          <ListItemIcon>
            <HistoryIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='History' />
        </MenuItem>
      </Link>
      <Link to='/bookmarks' onClick={handleClose}>
        <MenuItem >
          <ListItemIcon>
            <BookmarkIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Bookmarks' />
        </MenuItem>
      </Link>
    </div>
  )
}
