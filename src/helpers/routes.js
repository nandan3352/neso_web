import React, { useContext } from 'react'
import { navigate, Route } from 'react-router'
import { FireBaseContext } from '../context/firebase'
import EventBus from '../lib/EventBus'
import { AuthDialogEvent } from '../Services/Events'

export const navigate_REASONS_UNAUTHENTICATED = 'unAuthenticated'

export default function ProtectedRoute({ call, component: Component, ...rest }) {

  const { user } = useContext(FireBaseContext)

  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          return call ? Component(props) : <Component {...props} user={user} />
        } else {
          const from = rest.possibleFrom ? rest.possibleFrom : '/'
          EventBus.dispatch(AuthDialogEvent, { open: true })
          return (
            <navigate
              to={{
                pathname: from,
                state: { from: from, reason: navigate_REASONS_UNAUTHENTICATED },
              }} />
          )
        }
      }}
    />
  )
}

