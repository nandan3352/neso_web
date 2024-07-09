import { makeStyles } from '@material-ui/core/styles'
import Latest from '../../../assets/images/Latest.svg'


const useStyles = makeStyles((theme) => ({

    appBar: {
        transition: 'background 225ms ease-in',
        background: theme.palette.background.surface,
        color: theme.palette.text.secondary,
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
        height: 60,
        margin: 0,
        [theme.breakpoints.down('xs')]: {
            height: 56,
        }
    },

    latestIcon: {
        mask: `url(${Latest}) no-repeat center`,
        backgroundColor: theme.palette.grey[300],
    },

    toolbar: {

    },

    toolbarRegular: {
        [theme.breakpoints.up('xs')]: {
            minHeight: '60px !important',
        },
        [theme.breakpoints.down('xs')]: {
            minHeight: '56px !important'
        },
    },

    logo: {
        marginRight: theme.spacing(4),
        color: 'white',
        [theme.breakpoints.down('sm')]: {
            marginRight: 'auto'
        }
    },

    navigationDesktop: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },

    hideMobile: {
        display: 'block',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },

    navLinks: {
        ...theme.typography.subtitle1,
        marginRight: '32px',
        padding: "18px 0px",
        lineHeight: '24px',
        color: theme.palette.text.primary,
        fontSize: '16px',
        '&:hover': {
            textDecoration: 'none',
        },
    },

    grow: {
        flexGrow: 1,
    },

    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    iconsRoot: {
    },

    desktopIcons: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },

    notificationBadge: {
        height: 20,
        width: 20,
        border: `1.35px solid ${theme.palette.background.default}`,
        borderRadius: '50%',
    },


    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },


    containerRoot: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },


    menuButton: {
        marginRight: theme.spacing(2),
    },

    title: {
        marginRight: theme.spacing(4),
        display: 'block',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: 'rgba(33, 33, 33, 0.08)',
        '&:focus': {
            backgroundColor: 'rgba(33, 33, 33, 0.08)',
        },
        marginRight: theme.spacing(1),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },

    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '0ch',
            '&:focus': {
                width: '10ch',
            },
        },
    },


    desktopNavSubjectList: {
        width: '500px'
    },

    displayName: {
        color: '#017374',
        borderColor: '#017374',
        height: 37,
    },


}))

export default useStyles