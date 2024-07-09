import React, { useContext, useEffect, useState } from 'react'
import { navigate } from "react-router-dom";
import { CircularProgress, Dialog } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import NesoLogo from '../../assets/images/Logos/NesoLogo.svg'
import NesoLogoDark from '../../assets/images/Logos/NesoLogoDark.svg'
import Timeline from '../../components/UI/Timeline/Timeline'
import './FuelAddress.css'
import AddressForm from './AddressForm/AddressForm'
import ConfirmAddress from './ConfirmAddress/ConfirmAddress'
import { databaseOnce } from '../../Services/Database'
import { useSubscriptionListener } from '../../Services/Subscription'
import { checkAddressIsValid } from '../../Services/Utils';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '28px 24px 20px 24px',
    overflow: 'auto',

    [theme.breakpoints.down(469)]: {
      padding: '24px 17px 17px 20px',
    },

    '& .fuelAddressTimeline': {
      '& .transitionLine > div': {
        margin: '0px 12px',
      },
    },
  },
}))

export default function FuelAddress(props) {
  const classes = useStyles()
  const subscription = useSubscriptionListener()
  const { data, name } = props.location.state
  const theme = useTheme()

  const [userAddress, setUserAddress] = useState({
    name: '',
    number: '',
    pincode: '',
    city: '',
    state: '',
    country: '',
    address: '',
  })
  const user = props.user
  const [showConfirmaddress, setShowConfirmAddress] = useState(undefined)
  const [isEditAddress, setIsEditAddress] = useState(false)


  useEffect(() => {
    if (!user) return
    databaseOnce(`/Users/${user.uid}/billaddress`).then((snapshot) => {
      const result = snapshot.val()
      if (result) {
        setUserAddress(result)
        setShowConfirmAddress(checkAddressIsValid(result))
      } else {
        setShowConfirmAddress(false)
      }
    })
  }, [user])

  if (subscription.isSubscribed) {
    return <navigate to="/fuel" />
  }

  return (
    <>
      <div style={{ height: '100vh', width: '100vw' }}></div>
      <Dialog disableScrollLock={false} fullScreen open={true}>
        <div className={classes.root}>
          <div className='nesoLogo'>
            <img
              src={theme.palette.type === 'dark' ? NesoLogoDark : NesoLogo}
              alt=''
            />
          </div>

          <div className='fuelAddressTimeline'>
            <Timeline payment first='Address' second='Pay' />
          </div>

          {showConfirmaddress === undefined ?
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <CircularProgress color='secondary' size={24} />
            </div> :
            (showConfirmaddress ? (
              <ConfirmAddress
                user={user}
                subscriptionData={data}
                name={name}
                setEditAddress={setIsEditAddress}
                userAddress={userAddress}
                setConfirmAddress={setShowConfirmAddress}
              />
            ) : (
              <AddressForm
                editAddress={isEditAddress}
                userAddress={userAddress}
                setUserAddress={setUserAddress}
                setConfirmAddress={setShowConfirmAddress}
              />
            ))}
        </div>
      </Dialog>
    </>
  )
}
