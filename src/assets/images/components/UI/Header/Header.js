import React, { useContext, useEffect, useState } from 'react'
import useStyles from './HeaderStyles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import Container from '@material-ui/core/Container'
import {
  useMediaQuery,
  ButtonBase,
  useTheme,
  SvgIcon,
} from '@material-ui/core'


import NesoLogo from '../../../assets/images/Logos/NesoLogo.svg'
import NesoLogoRadium from '../../../assets/images/Logos/NesoLogoRadium.svg'
import NesoLogoPlutonium from '../../../assets/images/Logos/NesoLogoPlutonium.svg'
import NesoLogoUranium from '../../../assets/images/Logos/NesoLogoUranium.svg'
import NesoLogoDark from '../../../assets/images/Logos/NesoLogoDark.svg'
import NesoLogoDarkRadium from '../../../assets/images/Logos/NesoLogoDarkRadium.svg'
import NesoLogoDarkUranium from '../../../assets/images/Logos/NesoLogoDarkUranium.svg'
import NesoLogoDarkPlutonium from '../../../assets/images/Logos/NesoLogoDarkPlutonium.svg'
import { ReactComponent as BWFeul } from '../../../assets/images/Fuel/Icons/FuelBWIcon.svg'
import { ReactComponent as Latest } from '../../../assets/images/Latest.svg'
import { ReactComponent as Hiring } from '../../../assets/images/Recruit/hiring.svg'
import { ReactComponent as HiringDark } from '../../../assets/images/Recruit/hiringDark.svg'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import CourseDrawer from './CourseListDrawer'
import {
  useEventDispatch,
  LATEST_ITEM_BACKDROP_ACTION,
} from '../../../Services/Events'
import HeaderButtons from './AuthComponents/HeaderButton'
import UserLoggedInComps from './AuthComponents/UserLoggedInComps'
import { useUser } from '../../../Services/Auth'
import { useDatabase } from '../../../Services/Database'
import { useSubscriptionListener } from '../../../Services/Subscription'
import clsx from 'clsx'
import SearchBar from './SearchBarComponents/SearchBar'
import { countNewLatestItems, updateLatestTimeStamp } from '../../../Services/Utils'

export default function PrimarySearchAppBar(props) {

  const navigator = useNavigate()
  const classes = useStyles()
  const user = useUser()

  const latest = useDatabase('/Latest/lectures').data
  const subscriptionState = useSubscriptionListener()

  const theme = useTheme()

  const isNotDesktop = useMediaQuery(theme.breakpoints.down('sm'))
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  const [showLatestIcon, setshowLatestIcon] = useState(
    navigator.location.pathname === '/' || navigator.location.pathname.includes('home')
  )

  const [showSearchBar, setShowSearchBar] = useState(false);


  const [latestSelected, setLatestSelected] = useState(false)
  const [userImage, setUserImage] = useState(undefined)
  const profilePic = user && user.profilePic

  useEffect(() => {
    setUserImage(profilePic || undefined)
    return () => {
    }
  }, [profilePic])

  //handles

  const latestToggleEvent = useEventDispatch(LATEST_ITEM_BACKDROP_ACTION)

  const handleLatestSection = () => {
    if (!latestSelected) {
      updateLatestTimeStamp()
    }
    latestToggleEvent({ open: !latestSelected })
    setLatestSelected(!latestSelected)
  }

  //HeaderLogo

  const getHeaderLogo = (plan) => {
    const dark = theme.palette.type === 'dark'
    switch (plan) {
      case 'radium':
        return dark ? NesoLogoDarkRadium : NesoLogoRadium
      case 'uranium':
        return dark ? NesoLogoDarkUranium : NesoLogoUranium
      case 'plutonium':
        return dark ? NesoLogoDarkPlutonium : NesoLogoPlutonium
      default:
        return dark ? NesoLogoDark : NesoLogo
    }
  }


  //latestIcon handle

  useEffect(() => {
    return navigator.listen((location) => {
      const canShowLatest = (location.pathname === '/' || location.pathname.includes('home'))
      setshowLatestIcon(canShowLatest)
      setLatestSelected(false)
    })
  }, [navigator])


  const latestSectionIcon = () => {
    return showLatestIcon ? (
      <IconButton
        className={classes.iconsRoot}
        color='inherit'
        onClick={handleLatestSection}>
        <Badge classes={{
          badge: classes.notificationBadge,
        }} badgeContent={latest ? countNewLatestItems(latest) : null} max={9} color='primary'>
          <SvgIcon color={latestSelected ? 'primary' : 'inherit'} >
            <Latest />
          </SvgIcon>
        </Badge>
      </IconButton>
    ) : (
      <div />
    )
  }



  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Container>
        <Toolbar disableGutters classes={{ root: classes.toolbar, regular: classes.toolbarRegular }}>
          {/* Logo */}
          <div className={classes.logo}>
            <Link to='/'>
              <ButtonBase
                disableRipple
                style={{ paddingTop: '8px', paddingBottom: '8px' }}>
                <img src={getHeaderLogo(subscriptionState.isSubscribed ? subscriptionState.plan : null)} alt='' />
              </ButtonBase>
            </Link>
          </div>

          {/* Navigation */}
          <div className={classes.navigationDesktop}>
            <CourseDrawer navigator={navigator} />
            <a href="https://forum.nesoacademy.org"
              className={classes.navLinks}
              target="_blank"
              rel="noopener noreferrer">
              {' '} Forum
            </a>

            <Link to='/recommended-books' className={classes.navLinks} variant='subtitle1'>
              {' '}
              Books{' '}
            </Link>

            {!showSearchBar && <Link to='/careers' className={classes.navLinks} style={{ height: "16px", margin: "4.7px 8px auto 0px" }}>
              {theme.palette.type === 'dark' ? <HiringDark /> : <Hiring />}
            </Link>}
          </div>

          {/* Search section */}

          <SearchBar showBar={showSearchBar} toggle={setShowSearchBar} isMobile={isMobile} />

          {/* Desktop section */}
          <div style={{ display: 'flex' }}>
            <Link to='/fuel'>
              <IconButton
                className={clsx(classes.hideMobile, classes.desktopIcons)}
                aria-label='show 4 new mails'>
                <Badge badgeContent={0} max={9} color='primary'>
                  <SvgIcon>
                    <BWFeul />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Link>

            {latestSectionIcon()}

          </div>

          {/* Auth section */}
          {user && user.uid ?
            <UserLoggedInComps
              darkMode={props.darkMode}
              tabletScreen={isNotDesktop}
              navigator={navigator}
              user={user}
              img={userImage}
              setImg={setUserImage}
              mobileScreen={isMobile} /> :
            <HeaderButtons
              darkMode={props.darkMode}
              mobileScreen={isMobile}
              navigator={navigator}
              tabletScreen={isNotDesktop} />}
        </Toolbar>
      </Container>
    </AppBar>

  )
}
