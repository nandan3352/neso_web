import { useState } from 'react'
import HeaderDialog from '../../Login-SignupDialog/Dialog/Dialog'
import MediumScreenOverlay from '../OverlayMediumScreen/MediumScreenOverlay'
import SO1Button from '../../Buttons/Secondary/Outline1/Button'
import SPButton from '../../Buttons/Secondary/Filled/Button'
import { IconButton, makeStyles } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import EllipseOverlay from '../../../../assets/images/Overlay/ellipseOverlay/EllipseOverlay'
import { AuthDialogEvent, useEventDispatch } from '../../../../Services/Events'

const useHeaderButtonStyles = makeStyles((theme) => ({
  ellipse: {},

  headerButtonGroup: {
    display: 'flex',
    alignItems: 'center',
  },

  headerButton: {
    display: 'block',
    marginRight: theme.spacing(2),
    minHeight: 0,
    minWidth: 0,
    '&:nth-child(4)': {
      marginRight: 0,
    },
    [theme.breakpoints.down('sm')]: {
      '&:nth-child(4)': {
        display: 'none',
      },
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}))

const HeaderButtons = (props) => {
  const classes = useHeaderButtonStyles()

  /* const [isHeaderDialogOpen, setIsHeaderDialogOpen] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(true)
  const handleClose = () => setIsHeaderDialogOpen(false) */
  const dispatchAuth = useEventDispatch(AuthDialogEvent)

  const [anchorElOverlay, setAnchorElOverlay] = useState(null)

  const handleClick = (event) => {
    setAnchorElOverlay(event.currentTarget)
  }

  const handleCloseOverlay = () => {
    setAnchorElOverlay(null)
  }

  //LargeScreen Context Menu
  const renderLargeScreenContextMenu = (
    <IconButton style={{
      marginLeft: -8,
      marginRight: 4
    }} onClick={handleClick}>
      <MoreVert />
    </IconButton>
  )

  return (
    <div className={classes.headerButtonGroup}>
      <div className={classes.ellipse}>
        {props.tabletScreen ? (
          <MediumScreenOverlay
            darkMode={props.darkMode}
            mobileScreen={props.mobileScreen}
            navigator={props.navigator}
            tabletScreen={props.tabletScreen}
          />
        ) : (
          renderLargeScreenContextMenu
        )}
      </div>
      <EllipseOverlay
        darkMode={props.darkMode}
        anchorEl={anchorElOverlay}
        handleClose={handleCloseOverlay}
      />

      <div className={classes.headerButton} style={{ marginRight: '0' }}>
        <SO1Button
          width='110px'
          style={{ minWidth: '110px' }}
          fullWidth={true}
          content='login'
          onClick={() => {
            if (props.tabletScreen) props.navigator.push('/login')
            else {
              /*   setIsHeaderDialogOpen(true)
                setShowLoginForm(true) */
              dispatchAuth({ auth: true })

            }
          }}
        />
      </div>

      <div className={classes.headerButton} style={{ marginLeft: '16px' }}>
        <SPButton
          width='125px'
          style={{ width: '125px' }}
          content='sign up'
          onClick={() => {
            if (props.tabletScreen) navigator.push('/login')
            else {
              dispatchAuth({ auth: true, login: false })
            }
          }}
        />
      </div>
    </div>
  )
}

export default HeaderButtons
