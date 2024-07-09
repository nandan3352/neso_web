import clsx from "clsx";
import { makeStyles, ButtonBase } from "@material-ui/core" 
import  KeyboardArrowRight  from "@material-ui/icons/KeyboardArrowRight";
import  KeyboardArrowLeft  from "@material-ui/icons/KeyboardArrowLeft";


const useStyle = makeStyles(theme => (
    {
        root: (props) => (
            {
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
                flexGrow: 1,
                backgroundColor :props.surface? theme.palette.background.paper : theme.palette.surface.main,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '4px 0px 0px 4px',
            }
        ),
        toggleIconButton: {
            transform: 'rotate(0deg)',
            [theme.breakpoints.down('xs')] : {
                transform: 'rotate(90deg)'
            }
        },

        mobileBreak: {
            width: theme.spacing(4),
            height: theme.spacing(8),
            [theme.breakpoints.down('xs')]: {
                width: 36,
                height: 36
            }
        }
    }
))




const DrawerToggleButton = (props) => {
    const classes = useStyle(props)
    return (
        <div className={clsx(classes.root, classes.mobileBreak)}>
            <ButtonBase className={clsx(classes.mobileBreak, classes.toggleIconButton)} onClick={props.onClick} >
                {props.open ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </ButtonBase>
        </div>
    )
}

export default DrawerToggleButton