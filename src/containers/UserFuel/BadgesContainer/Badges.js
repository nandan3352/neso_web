import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Badge1 from '../../../assets/images/Badges/Badge1.svg'
import Badge2 from '../../../assets/images/Badges/Badge2.png'
import Badge3 from '../../../assets/images/Badges/Badge3.svg'
import Badge4 from '../../../assets/images/Badges/Badge4.svg'
import Badge5 from '../../../assets/images/Badges/Badge5.svg'
import Badge6 from '../../../assets/images/Badges/Badge6.svg'
import Badge7 from '../../../assets/images/Badges/Badge7.png'
import Badge8 from '../../../assets/images/Badges/Badge8.png'
import Badge9 from '../../../assets/images/Badges/Badge9.png'
import Badge10 from '../../../assets/images/Badges/Badge10.png'
import Badge11 from '../../../assets/images/Badges/Badge11.png'
import { CardActionArea } from '@material-ui/core'
import { databaseOnValue, databaseUpdate } from '../../../Services/Database'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 24,
    minHeight: 100,
    maxWidth: 430,
    boxSizing: 'border-box',
    display: 'flex',
    flexWrap: 'wrap',
    gridColumnGap: 10,
    gridRowGap: 16,

    '& .selectedBadge': {
      border: '2px solid #018786',
      borderRadius: '100%',
    },

    '& > div': {
      height: 44,
      width: 44,
      display: 'flex',
      justifyContent: 'center',
      boxSizing: 'border-box',
      alignItems: 'center',

      '& .MuiCardActionArea-root': {
        height: 36,
        width: 36,
        margin: 'auto',
        borderRadius: '100%',
      },

      '& img': {
        height: 36,
        width: 36,
      },
    },
  },
}))

export default function Badges({ selectedBadge, setSelectedBadge, uid }) {
  const classes = useStyles()

  const setBadgeFromNumber = (num) => {
    switch (num) {
      case '1':
        return Badge1
      case '2':
        return Badge2
      case '3':
        return Badge3
      case '4':
        return Badge4
      case '5':
        return Badge5
      case '6':
        return Badge6
      case '7':
        return Badge7
      case '8':
        return Badge8
      case '9':
        return Badge9
      case '10':
        return Badge10
      case '11':
        return Badge11
      default:
        break
    }
  }

  useEffect(() => {
    return databaseOnValue(`/Subscriptions/${uid}/badge`, (snapshot) => {
      if (!snapshot) return
      const result = snapshot.val()
      setSelectedBadge({
        badge: setBadgeFromNumber(result),
        number: result,
      })
    })
  }, [])

  const clickHandler = (badge, number) => {
    databaseUpdate(`Subscriptions/${uid}`, {
      badge: number,
    }).then(() => {
      setSelectedBadge({
        badge: badge,
        number: number,
      })
    })
      .catch((err) => console.log(err))
  }

  return (
    <div className={classes.root}>
      <div
        className={selectedBadge.number === '1' && 'selectedBadge'}
        onClick={() => clickHandler(Badge1, '1')}
      >
        <CardActionArea>
          <img src={Badge1} alt='' />
        </CardActionArea>
      </div>
      <div
        className={selectedBadge.number === '2' && 'selectedBadge'}
        onClick={() => clickHandler(Badge2, '2')}
      >
        <CardActionArea>
          <img src={Badge2} alt='' />
        </CardActionArea>
      </div>
      <div
        className={selectedBadge.number === '3' && 'selectedBadge'}
        onClick={() => clickHandler(Badge3, '3')}
      >
        <CardActionArea>
          <img src={Badge3} alt='' />
        </CardActionArea>
      </div>
      <div
        className={selectedBadge.number === '4' && 'selectedBadge'}
        onClick={() => clickHandler(Badge4, '4')}
      >
        <CardActionArea>
          <img src={Badge4} alt='' />
        </CardActionArea>
      </div>
      <div
        className={selectedBadge.number === '5' && 'selectedBadge'}
        onClick={() => clickHandler(Badge5, '5')}
      >
        <CardActionArea>
          <img src={Badge5} alt='' />
        </CardActionArea>
      </div>
      <div
        className={selectedBadge.number === '6' && 'selectedBadge'}
        onClick={() => clickHandler(Badge6, '6')}
      >
        <CardActionArea>
          <img src={Badge6} alt='' />
        </CardActionArea>
      </div>
      <div
        className={selectedBadge.number === '7' && 'selectedBadge'}
        onClick={() => clickHandler(Badge7, '7')}
      >
        <CardActionArea>
          <img src={Badge7} alt='' />
        </CardActionArea>
      </div>
      <div
        className={selectedBadge.number === '8' && 'selectedBadge'}
        onClick={() => clickHandler(Badge8, '8')}
      >
        <CardActionArea>
          <img src={Badge8} alt='' />
        </CardActionArea>
      </div>
      <div
        className={selectedBadge.number === '9' && 'selectedBadge'}
        onClick={() => clickHandler(Badge9, '9')}
      >
        <CardActionArea>
          <img src={Badge9} alt='' />
        </CardActionArea>
      </div>
      <div
        className={selectedBadge.number === '10' && 'selectedBadge'}
        onClick={() => clickHandler(Badge10, '10')}
      >
        <CardActionArea>
          <img src={Badge10} alt='' />
        </CardActionArea>
      </div>
      <div
        className={selectedBadge.number === '11' && 'selectedBadge'}
        onClick={() => clickHandler(Badge11, '11')}
      >
        <CardActionArea>
          <img src={Badge11} alt='' />
        </CardActionArea>
      </div>
    </div>
  )
}
