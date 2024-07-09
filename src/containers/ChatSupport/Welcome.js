import React, { useEffect } from "react"
import HiImage from '../../assets/images/ChatSupport/Hi.svg'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import { useState } from 'react'
import { firestoreAddDoc, firestoreSetDoc } from "../../Services/Database"


const useStyles = makeStyles(theme => (
    {
        root: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            boxSizing: 'border-box',
            padding: '8.75%',
            color: theme.palette.text.secondary
        },
        chip: {
            backgroundColor: theme.palette.surface.main,
            border: 'none',
            margin: '16px 8px 8px 0px'
        },
        supportHi: { color: theme.palette.text.primary, marginBottom: '16px' }
    }
))

function Welcome(props) {
    const classes = useStyles()
    const issues = ['Normal', 'Crash', 'Neso Fuel']
    const [issue, setIssue] = useState('')

    useEffect(() => {

        if (issue === '') return

        const obj = {
            isResolved: false,
            timestamp: new Date(),
            type: issue.split(' ').slice(-1)[0]
        }

        const firstMessage = {
            img: null,
            message: `My issue is related to ${issue}.`,
            timestamp: new Date(),
            user: 'user'
        }

        firestoreSetDoc(`SupportChat/${props.uid}`, obj).then(() => {
            firestoreAddDoc(`SupportChat/${props.uid}/Messages`, firstMessage)
            setIssue('') //success

        })


    }, [issue])


    return (
        <div className={classes.root}>
            <div>
                <img src={HiImage} alt='' />
                <Typography variant='h3' className={classes.supportHi}>Say Hi!</Typography>
                <Typography variant='subtitle1'>Please let us know if you <br />have any queries.</Typography>
            </div>

            <div>
                <Typography variant='subtitle1' >My issue is related to</Typography>
                {issues.map(i => (
                    <Chip variant='outlined' label={i} className={classes.chip} onClick={() => setIssue(i)} disabled={issue != ''} />
                ))}
            </div>

        </div>
    )
}

export default Welcome