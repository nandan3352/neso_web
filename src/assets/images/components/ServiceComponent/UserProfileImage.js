import { makeStyles } from "@material-ui/core"
import { memo, useEffect, useState } from "react"
import { databaseOnce } from "../../Services/Database"


const useStyles = makeStyles((theme) => ({
    profilePic: props => ({
        borderRadius: '50%',
        height: props.width || '100%',
        width: props.width || '100%'
    }),

    placeHolder: props => ({
        fontFamily: 'Kalam',
        backgroundColor: '#4B5CB9',
        textTransform: 'uppercase',
        borderRadius: '50%',
        height: props.width || '100%',
        width: props.width || '100%',
        fontSize: props.width ? props.width / 2 : '0.875rem',
        position: 'replative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& > span': {
            fontSize: '0.875em',
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'white'
        }
    })
}))


/* setImg -> used to store a img globally somewhere */

const UserProfileImage = (props) => {

    const classes = useStyles(props)

    const [img, setImg] = useState(props.img)

    useEffect(() => {
        setImg(props.img)
        if (props.uid && !props.img && !img && img !== null) {
            databaseOnce(`Users/${props.uid}/imgURL`).then((snap) => {
                if (snap) {
                    setImg(snap.val())
                    if (props.setImg) {
                        props.setImg(snap.val())
                    }
                }
            })
        }
    }, [props.uid, props.img])

    return img ? (<img className={classes.profilePic} key={classes.profilePic} onError={(img) => {
        img.target.onerror = null
        setImg(null)
    }} src={img} alt="" />) :
        <div className={classes.placeHolder}>
            <span>
                {props.name ? props.name[0] : 'N'}
            </span>
        </div>
}

export default memo(UserProfileImage)