import { makeStyles, TableCell, TableHead, TableRow } from "@material-ui/core"
import clsx from "clsx"



const useStyles = makeStyles(theme => (
    {
        root: {
            marginTop: '8px',
            width: '100%',
        },

        headerStyle: props => ({
            ...theme.typography.overline,
            borderTop: `1px solid ${theme.palette.divider}`,
            color: theme.palette.text.secondary,
            paddingBottom: theme.spacing(1),
            paddingTop: 8,
            fontSize: '10px',
            lineHeight: '16px',
            fontWeight: 500,
            '&:not(:first-child)': {
                borderLeft: `1px solid ${theme.palette.divider}`,
            },
            background: props.from === 'result' ? theme.palette.background.default : theme.palette.background.surface,
            '&:first-child': {
                borderLeft: props.from !== 'result' && `1px solid ${theme.palette.divider}`
            }
        }),

        positionHeader: {
            paddingLeft: theme.spacing(3),
            paddingRight: 37,
            maxWidth: 'auto',
            textAlign: 'center',
            '&:before': {
                content: `'position'`,
                [theme.breakpoints.down('xs')]: {
                    content: `'Rank'`,
                }
            },
            [theme.breakpoints.down('xs')]: {
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(2),
            }
        },

        nameHeader: {
            paddingLeft: theme.spacing(2),
        },

        scoreHeader: {
            paddingRight: 27,
            [theme.breakpoints.down('xs')]: {
                paddingRight: theme.spacing(2),
            }
        },

        leaderBoardHeaderRoot: {
            marginLeft: theme.spacing(3),
            display: 'inline-flex',
            width: '100%',
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            [theme.breakpoints.down('xs')]: {
                marginLeft: theme.spacing(2),
            }
        },


        leaderBoardHeaderTitle: {
            ...theme.typography.overline,
            fontWeight: '500',
            lineHeight: '16px',
            fontSize: '10px',
            '&:first-child': {
                marginRight: 26,
            },
            '&:last-child': {
                marginRight: theme.spacing(4),
            },
            [theme.breakpoints.down('xs')]: {
                '&:first-child': {
                    marginRight: theme.spacing(9),
                },
                '&:last-child': {
                    marginRight: theme.spacing(2),
                }
            },
            color: theme.palette.text.secondary
        },

    }
))

//TODO: need to complete :(

const LeaderBoardSectionHeader = (props) => {
    const classes = useStyles(props)
    return (
        <TableHead>
            <TableRow className={classes.root}>
                <TableCell
                    className={clsx(classes.positionHeader, classes.headerStyle)}
                    width={56}
                    align="center">
                </TableCell>
                <TableCell
                    className={clsx(classes.nameHeader, classes.headerStyle)} align="center">
                    Name
                </TableCell>
                <TableCell
                    className={clsx(classes.headerStyle, classes.scoreHeader)} align="center">
                    Score
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

export default LeaderBoardSectionHeader