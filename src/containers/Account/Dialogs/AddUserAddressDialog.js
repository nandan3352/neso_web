import React from 'react'
import { Dialog, makeStyles } from '@material-ui/core'
import AddressForm from '../../FuelAddressPage/AddressForm/AddressForm'

const useStyles = makeStyles((theme) => ({
  userAddressDialog: {
    boxSizing: 'border-box',
    maxWidth: 850,
    width: '90vw',
    minHeight: 531,
    overflow: 'auto',
    padding: '7px 44px 27px 44px',

    [theme.breakpoints.down(469)]: {
      padding: '7px 24px 10px 24px',
    },
  },

  dialog: {
    '& .MuiDialog-paper': {
      [theme.breakpoints.down(469)]: {
        margin: 15,
      },
    },
  },
}))

export default function AddUserAddressDialog({
  onClose,
  userAddress,
  setUserAddress,
  userBillAddressOpen,
  setIsUserAddressAvailable,
}) {
  const classes = useStyles()

  return (
    <>
      <Dialog
        open={userBillAddressOpen}
        onClose={onClose}
        maxWidth='lg'
        className={classes.dialog}
      >
        <div className={classes.userAddressDialog}>
          <AddressForm
            userAddress={userAddress}
            editAddress
            setUserAddress={setUserAddress}
            setIsUserAddressAvailable={setIsUserAddressAvailable}
            onClose={onClose}
          />
        </div>
      </Dialog>
    </>
  )
}
