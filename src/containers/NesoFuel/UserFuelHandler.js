import { CircularProgress } from '@material-ui/core'
import React from 'react'
import { useUser } from '../../Services/Auth'
import { useSubscriptionListener } from '../../Services/Subscription'
import UserFuel from '../UserFuel/UserFuel'
import NesoFuel from './NesoFuel'

export default function UserFuelHandler(props) {
  const listener = useSubscriptionListener()
  const user = useUser()

  const cameForRefuel = Boolean(props.location.state && props.location.state.refuel)

  if (listener.loading) {
    return (
      <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress color='secondary' />
      </div>
    )
  }

  return <> {listener && listener.plan && user && !cameForRefuel ? <UserFuel user={user} data={listener} /> : <NesoFuel user={user} />} </>
}
