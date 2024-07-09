import { Container, makeStyles } from "@material-ui/core";
import Scan from "../../assets/images/QRcode/Scan.svg";


const useStyle = makeStyles(theme => ({
    root: {
        paddingTop: 82,
        paddingBottom: 82,
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            paddingTop: 69
        },
        [theme.breakpoints.down('xs')]: {
            paddingTop: 0,
            paddingBottom: 62,
            justifyContent: 'center'
        }
    },
    title: {
        ...theme.typography.h6,
        color: theme.palette.text.primary
    },
    body: {
        ...theme.typography.subtitle1,
        marginTop: 8,
        color: theme.palette.text.primary,
        lineHeight: '24px',
        textAlign: 'left',
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center'
        }
    },

    leftSection: {
        display: 'block',
        marginTop: 34,
        marginLeft: 66,
        [theme.breakpoints.down('sm')]: {
            marginTop: 0,
            marginLeft: 56,
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: 24,
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 0,
            alignItems: 'center'
        }
    },

    or: {
        padding: '24px 0px',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: "24px",
        color: theme.palette.text.secondary
    },
    img: {
        objectFit: 'contain',
        maxWidth: 594,
        marginRight: 66,
        display: 'block',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },

    imgSm: {
        objectFit: 'contain',
        maxWidth: 352,
        marginRight: 30,
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    getInPS: {
        height: 38,
        marginTop: 24
    },
    scan: {
        marginTop: 16,
        height: 96,
        width: 96
    }
}))

const AppPage = (props) => {

    const classes = useStyle()

    return (
        <Container className={classes.root}>
            <div className={classes.leftSection} >
                <div className={classes.title}>
                    Neso Academy
                </div>
                <div className={classes.body}>
                    Download the Neso Academy app <br /> from Playstore.
                </div>
                <a
                    href='https://play.google.com/store/apps/details?id=org.nesoacademy'
                    target='_blank'
                    rel='noopener noreferrer'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/neso-c53c4.appspot.com/o/ImageResource%2FWebsiteResource%2FgetItOnGooglePlay.webp?alt=media&token=11f388b4-2564-4dd5-8ee6-038feb6e92b9" className={classes.getInPS} alt='' ></img>
                </a>
                <div className={classes.or}>
                    or
                </div>
                <div className={classes.title}>
                    Scan me!
                </div>
                <div className={classes.body}>
                    Download Neso Academy app by <br /> scanning this QR code.
                </div>
                <img src={Scan} className={classes.scan} alt='' ></img>
            </div>

            <img src='https://firebasestorage.googleapis.com/v0/b/neso-c53c4.appspot.com/o/ImageResource%2FWebsiteResource%2FAndroidAppLG.webp?alt=media&token=7423b989-ab64-4300-91ac-767a6d99bd88' className={classes.img} alt='' ></img>
            <img src='https://firebasestorage.googleapis.com/v0/b/neso-c53c4.appspot.com/o/ImageResource%2FWebsiteResource%2FAndroidAppSM.webp?alt=media&token=17757d96-68f6-4783-a264-e7466136f62a' className={classes.imgSm} alt='' ></img>

        </Container>)
}


export default AppPage