import { Button, CircularProgress, makeStyles } from "@material-ui/core"
import NotesCSS, { mobileScreenStyles as smStyles } from './notesStyles.js'
import DOMPurify from "dompurify"
import { useEffect, useState } from "react"
import { useDatabaseOnce } from "../../../Services/Database.js"
import { ReactComponent as FuelImg } from "../../../assets/images/Fuel/NesoFuelFullC.svg";
import './syntax-highlighting-styles.css'
import { Link } from "react-router-dom"

const useStyle = makeStyles((theme) => ({
    root: props => ({
        height: !props.canAccess ? 615 : 'auto',
        ...NotesCSS,
        fontFamily: 'Lato, Roboto',
        userSelect: props.paid ? 'none' : 'auto',
        '& .dark-theme': {
            display: theme.palette.type === 'dark' ? 'block' : 'none'
        },
        '& .light-theme': {
            display: theme.palette.type === 'light' ? 'block' : 'none'
        },
        marginTop: 48,
        position: 'relative',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            margin: '36px 0px',
            ...smStyles
        },
        [theme.breakpoints.down('xs')]: {
            margin: '24px 0px',
            ...smStyles
        }
    }),
    loader: {
        textAlign: 'center',
        marginBottom: 32,
    },

    fuelHide: {
        background: `linear-gradient(180deg, ${theme.palette.type === 'light' ? 'rgba(255, 255, 255, 0)' : 'rgba(18,18,18,0)'} -27%, ${theme.palette.background.default} 44.04%);`,
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        zIndex: 100,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column-reverse',

    },
    fuelHideInnerContainer: {
        marginBottom: 134
    },
    fuelText: {
        margin: '16px 0px 24px 0px',
        ...theme.typography.h6
    }
}))

const NotesComponent = ({ id, title, paid, canAccess, firstPage }) => {

    const { data } = useDatabaseOnce(canAccess && `/NotesWeb/Lecture/${id}/url`)

    const [notes, setNotes] = useState(undefined)

    useEffect(() => {
       
        if (canAccess && !data)
            return

        const url = !canAccess ? firstPage : data

        fetch(url).then(r => r.text().then((html) => {
            setNotes(html)
        }))

    }, [data, canAccess, firstPage])

    const toggleFunction = `onclick="(function(){const solution = document.getElementById(event.currentTarget.id);solution.classList.toggle('show');})();"`
    const classes = useStyle({ paid, canAccess })

    const getPurifiedHtml = (html) => {
        const safeHtml = DOMPurify.sanitize(html)
        const template = `
        <html>
        ${safeHtml.replace(/class="solution-toggle"/g, (e) => `${e} ${toggleFunction}`)}
        </html>
        `
        return template
    }

    const Loader = (
        <div className={classes.loader}>
            <CircularProgress color="secondary" />
        </div>
    )

    const NesoFuelComponent = (<div className={classes.fuelHide} >
        <div className={classes.fuelHideInnerContainer}>
            <FuelImg />
            <div className={classes.fuelText}>
                Get Neso Fuel to access the section
            </div>
            <Link to={{pathname : "/fuel" , state : {refuel : true}}}>
                <Button variant='outlined' color='primary' >
                    Get fuel
                </Button>
            </Link>
        </div>
    </div>)

    return (
        <div className={classes.root}>
            {notes ? <div dangerouslySetInnerHTML={{ //since we are purifying the html, no need for worries
                __html: getPurifiedHtml(notes)
            }} /> : Loader}
            {notes && !canAccess && NesoFuelComponent}
        </div>)
}


export default NotesComponent