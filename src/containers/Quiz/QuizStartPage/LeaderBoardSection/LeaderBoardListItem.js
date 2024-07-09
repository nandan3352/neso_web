import { makeStyles, TableCell, TableRow } from "@material-ui/core"
import clsx from "clsx";
import moment from "moment";
import awards_first from "../../../../assets/images/Quiz/awards_first.svg";
import awards_second from "../../../../assets/images/Quiz/awards_second.svg";
import awards_third from "../../../../assets/images/Quiz/awards_third.svg";
import UserProfileImage from "../../../../components/ServiceComponent/UserProfileImage";

const useStyle = makeStyles(theme => (
    {
        root: (props) => ({
            background: props.highlight ? theme.palette.container.footer : 'none',
            boxShadow: props.highlight && theme.palette.type !== 'dark' ? 'rgba(185, 185, 185, 0.49) 0px 1px 4px' : 'none',
        }),


        cellRoot: props => ({
            paddingTop: 12,
            paddingBottom: 12,
            borderBottom: 'none',
            '&:not(:first-child)': {
                borderLeft: `1px solid ${theme.palette.divider}`,
            }
        }),

        position: {
            position: 'relative',
            ...theme.typography.h5,
            paddingLeft: theme.spacing(3),
            paddingRight: 37,
            [theme.breakpoints.down('xs')]: {
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(2),
            }
        },

        score: {
            paddingRight: 27,
            [theme.breakpoints.down('xs')]:
            {
                paddingRight: theme.spacing(2),
            }
        },


        awards: {
            position: 'absolute',
            right: 0,
            top: 14,
            display: 'flex',
            alignItems: 'center',
            marginLeft: -44,
            paddingRight: 10,
            minWidth: 36,
            [theme.breakpoints.down('xs')]: {
                display: 'none'
            }
        },

        awardsMobile: {
            position: 'absolute',
            zIndex: 3,
            height: theme.spacing(3),
            width: theme.spacing(3),
            borderRadius: '50%',
            right: -6,
            bottom: -8,
            backgroundColor: theme.palette.background,
            display: 'none',
            [theme.breakpoints.down('xs')]: {
                display: 'block'
            }
        },

        flex: {
            display: 'flex',
            alignItems: 'center',
        },


        profileContainer: {
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
        },

        profileIconContainer: {
            position: 'relative',
            height: theme.spacing(5),
            width: theme.spacing(5),
            minWidth: theme.spacing(5),
            marginRight: 20,
            marginLeft: -0,
            [theme.breakpoints.down('xs')]: {
                position: 'absolute',
                marginLeft: -theme.spacing(5) - 12,
            }
        },

        profilePic: {
            position: 'absolute',
            height: '100%',
            width: '100%',
        },

        profileDet: {

        },

        profileName: {
            ...theme.typography.body2,
            textTransform: 'capitalize',
            maxHeight: 24,
            overflow: 'hidden',
            maxWidth: 140,
            textOverflow: 'ellipsis'
        },
        profileDuration: {
            ...theme.typography.caption,
            color: theme.palette.text.secondary
        },

        scoreContainer: {
            display: 'flex',
            flexWrap: 'wrap-reverse',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            minWidth: 106,
            alignItems: 'center',
            [theme.breakpoints.down('xs')]: {
                flexWrap: 'wrap',
                minWidth: 0,
                alignItems: 'end',
                flexDirection: 'column-reverse'
            }
        },


        level: {
            ...theme.typography.caption,
            textAlign: 'center',
            padding: 2,
            minWidth: 34,
            width: 34,
            height: 20,
            backgroundColor: theme.palette.surface.main,
            borderRadius: '2px',
            color: theme.palette.grey[200]

        },

        profileDataContainer: {
            paddingLeft: 16,
            [theme.breakpoints.down('xs')]: {
                paddingLeft: 62,
            }
        },

        percentage: {
            minWidth: 44,
            ...theme.typography.subtitle1,
            //            marginLeft: theme.spacing(3),
            [theme.breakpoints.down('xs')]: {
                fontWeight: 500,
                marginBottom: 4,
                marginLeft: 0,
            }

        }
    }
))

export const GOLD = 0
export const SILVER = 1
export const BRONZE = 2

const getAwards = (type) => {
    switch (type) {
        case GOLD:
            return awards_first
        case SILVER:
            return awards_second
        case BRONZE:
            return awards_third
        default:
            return 'nothing'
    }
}


const LeaderBoardListItem = (props) => {

    const position = props.position
    const name = props.name
    const timeStamp = moment(new Date(props.timestamp)).fromNow()
    const level = props.level
    const awards = props.awards
    const score = props.marks < 0 ? '0' : Number(((props.marks * 100) / (props.analytics.length * ((level + '' === '2' && 2) || 1))).toFixed(2))

    const classes = useStyle(props)

    return (
        <>
            <TableRow className={classes.root}>
                <TableCell width={56} className={clsx(classes.position, classes.cellRoot)} align="center">
                    {position}
                    <div className={classes.awards}>
                        {awards > 2 ? <div /> : <img src={getAwards(awards)} alt="" />}
                    </div>
                </TableCell>
                <TableCell className={clsx(classes.cellRoot, classes.profileDataContainer)} align="left">
                    <div className={classes.profileContainer} >

                        <div className={classes.profileIconContainer}>
                            {awards > 2 ? <div /> :
                                (<div className={classes.awardsMobile}>
                                    <img style={{ height: '100%', width: '100%' }} src={getAwards(awards)} alt="" />
                                </div>)}
                            <div className={classes.profilePic} >
                                <UserProfileImage width={40} name={name} uid={props.id} />
                            </div>
                        </div>
                        <div >
                            <div className={classes.profileName}>
                                {name}
                            </div>
                            <div className={classes.profileDuration}>
                                {timeStamp}
                            </div>
                        </div>

                        <div style={{ flexGrow: 1 }} />

                        <div className={classes.level}>
                            {`L${level}`}
                        </div>

                    </div>
                </TableCell>
                <TableCell width={22} className={clsx(classes.cellRoot, classes.score)} align="center">
                    {/*  <div className={classes.level}>
                        {`L${level}`}
                    </div>
 */}
                    <div className={classes.percentage}>
                        {`${score}%`}
                    </div>
                </TableCell>
            </TableRow>
        </>
    )

}

export default LeaderBoardListItem