import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import { ReactComponent as NesoFuel } from '../../../../assets/images/Fuel/NesoFuelFullC.svg'

const useStyles = makeStyles((theme) => ({
  root : {
    width: "100%",
  },
  BenefitCard: {
    '&': {
      height: 328,
      width: '100%',
      maxWidth: 470,
      padding: '0px 10px 0px 48px',
      boxSizing: 'border-box',
      position: 'relative',

      [theme.breakpoints.down(769)]: {
        maxWidth: 342,
        padding: '0px 34px 0px 32px',
      },

      [theme.breakpoints.down(469)]: {
        flexWrap: 'wrap',
        maxWidth: '100%',
        marginTop: 20,
      },
    },
  },

  notes: {
    ...theme.typography.caption,
    color : theme.palette.text.disabled,
    margin : "16px 26px 0px",
  },

  header: {
    '&': {
      color: theme.palette.text.secondary,
      fontSize: 20,
      fontWeight: 500,
      padding: '32px 0px',
    },
  },

  listContainer: {
    '& > div': {
      marginBottom: 12,
    },

    '&  div': {
      display: 'flex',
      minHeight: 24,
      height: 'fit-content',
    },
  },

  nesoFuel: {
    '&': {
      position: 'absolute',
      top: 20,
      right: 20,
    },
  },

  listItem: {
    marginLeft: 13.67,
    color: theme.palette.text.primary,
  },
}))

export default function BenefitCard({ free }) {
  const classes = useStyles()

  const theme = useTheme()

  const dynamicCardStyles = {
    border: '1px solid',
    borderColor: free ? theme.palette.divider : '#27AE60',
  }

  const freeList = {
    height: 20,
    width: 20,
  }

  const premiumList = {
    color: '#27AE60',
    height: 20,
    width: 20,
    boxSizing: 'border-box'
  }

  const Icon = () => (
    <>
      {free ? (
        <RadioButtonUncheckedIcon style={freeList} color='disabled' />
      ) : (
        <CheckCircleRoundedIcon style={premiumList} />
      )}
    </>
  )

  return (
    <div className={classes.root} >
      <div className={classes.BenefitCard} style={dynamicCardStyles}>
        <>
          {free ? (
            <div className={classes.header}>Free</div>
          ) : (
            <div className={classes.header}>Neso Fuel</div>
          )}
        </>

        {!free && (
          <div className={classes.nesoFuel}>
            <NesoFuel />
          </div>
        )}

        <div className={classes.listContainer}>
          {/* list item */}
          <div>
            <div>
              <CheckCircleRoundedIcon style={premiumList} />
              <span className={classes.listItem}>Access to free content</span>
            </div>
          </div>

          {/* list item */}
          <div>
            <div>
              <Icon />
              <span className={classes.listItem}>Ad-free experience</span>
            </div>
          </div>

          {/* list item */}
          <div>
            <div>
              <Icon />
              <span className={classes.listItem}>Paid chapters and lectures</span>
            </div>
          </div>

          {/* list item */}
          <div>
            <div>
              <Icon />
              <span className={classes.listItem}>Quizzes</span>
            </div>
          </div>

          {/* list item */}
          <div>
            <div>
              <Icon />
              <span className={classes.listItem}>Lecture-PPTs</span>
            </div>
          </div>

          {/* list item */}
          <div>
            <div>
              <Icon />
              <span className={classes.listItem}>Badges</span>
            </div>
          </div>
        </div>
      </div>
      {!free && <div className={classes.notes}>
        Note: Please check our current library before buying the Neso Fuel; we display everything we have
      </div>}
    </div>
  )
}
