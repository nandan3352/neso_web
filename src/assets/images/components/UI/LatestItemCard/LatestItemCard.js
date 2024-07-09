
import { Icon, makeStyles, Card, CardMedia, CardContent, Typography, CardActionArea, IconButton } from "@material-ui/core"
import MoreVertRounded from "@material-ui/icons/MoreVertRounded"
import PlaylistPlay from "@material-ui/icons/PlaylistPlay"
import { Link } from "react-router-dom";
import subsTag from "../../../assets/images/Fuel/NesoFuelStamp.svg";
import { getEndpointForId } from "../../../Services/Utils";

const useStyle = makeStyles((theme) => {
    return {
        cardRoot: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            borderRadius: 4,
        },
        subsTag: {
            height: '50%',
            position: 'absolute',
            left: 0,
            top: 0,
            transform: 'translateY(calc(50%))',
        },
        duration: {
            ...theme.typography.subtitle2,
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: "black",
            opacity: 0.87,
            paddingRight: 6,
            paddingLeft: 6,
            margin: 8,
            color: 'white',
        },
        playlist: {
            ...theme.typography.subtitle1,
            position: "absolute",
            bottom: 0,
            right: 0,
            minHeight: theme.spacing(5),
            display: 'flex',
            alignItems: 'center',
            backgroundColor: "black",
            borderRadius: '0px 0px 4px 0px',
            opacity: 0.87,
            paddingRight: 12,
            paddingLeft: 12,
            color: 'white',
        },

        cardActionArea: props => ({
            paddingTop: 10,
            paddingRight: 10,
            paddingLeft: 10,
            [theme.breakpoints.down('xs')]: {
                paddingTop: 8,
                paddingRight: 8,
                paddingLeft: 8,
            }
        }),

        thumbnail: {
            borderRadius: 4,
            paddingTop: 'calc(56.25%)',
            position: "relative",
            objectFit: 'contain',
        },
        action: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: 0,
            alignItems: 'flex-start',
        },
        title: {
            ...theme.typography.subtitle1,
            display: '-webkit-box',
            textOverflow: 'ellipsis',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textAlign: 'left',
            lineHeight: '24px',
            minHeight: theme.spacing(6),
            maxWidth: 234,
            marginRight: theme.spacing(3),
            paddingTop: theme.spacing(1),
            [theme.breakpoints.down('xs')]: {
                ...theme.typography.body2
            }
        }
    }
})

const GeneralContentCard = (props) => {

    const classes = useStyle(props)

    return (
        <Link to={getEndpointForId(props.id, props.courseName, props.duration ? props.chapName : props.title, props.duration ? props.title : props.firstVideoName)}>
            <Card className={classes.cardRoot} >
                <CardActionArea disableRipple className={classes.cardActionArea} >
                    <CardMedia className={classes.thumbnail} image={props.thumb} >
                        {
                            props.isPaid ?
                                <img className={classes.subsTag} src={subsTag} alt="" />
                                : <div />
                        }
                        {
                            props.duration ?
                                <div className={classes.duration} >{props.duration}</div>
                                : (props.playlistCount ?
                                    <div className={classes.playlist} > {props.playlistCount}
                                        <Icon style={{ marginLeft: '4px' }}>
                                            <PlaylistPlay htmlColor='#ffffff' />
                                        </Icon>
                                    </div> : <div />)
                        }
                    </CardMedia>
                    <CardContent className={classes.action}>
                        <Typography variant='subtitle1' color='textPrimary' className={classes.title}>
                            {props.title}
                        </Typography>

                        <IconButton onClick={props.handleMore} style={{ marginTop: '4px', marginRight: '-4px', padding: '4px' }}>
                            <MoreVertRounded />
                        </IconButton>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    )

}

export default GeneralContentCard