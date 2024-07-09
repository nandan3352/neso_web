
import { makeStyles } from "@material-ui/core";
import { createLecturesMergedArray, filterUserProgress } from "../../../../Services/Utils";
import Videos from "../Videos/Videos";


const useStyles = makeStyles((theme) => ({
    root: ({ isFree }) => ({
        padding: "16px 0px 42px",
        width: "150%",
        backgroundColor: isFree ? theme.palette.background.default : theme.palette.custom.backgroundPaidChapter,
        [theme.breakpoints.down("md")]: {
            width: "100%"
        }
    }),
    container: {
        maxWidth: 783.3
    },
    fuelHero: ({ isFree }) => ({
        display: isFree ? "none" : "block",
        padding: "16px 0 16px 64px",
        color: theme.palette.text.primary,
        [theme.breakpoints.down('sm')]: {
            padding: "16px 0 16px 16px"
        }
    }),
    fuelHeroTitle: {
        fontSize: 20,
        fontWeight: 500,
        lineHeight: 1.2,
        marginBottom: 4
    },
    fuelHeroSubtitle: {
        fontSize: 16,
        letterSpacing: 0.15,
        color: theme.palette.text.secondary,
        height: 24,
        marginBottom: 0,
        [theme.breakpoints.down('sm')]: {

        }
    }
}))

//free and paid sections are separate chapters
const SubjectLecturesList = ({
    course_id,
    courseName,
    chapter_name,
    user,
    subscription,
    lectureProgresses,
    isFree,
    lectures_obj,
    lec_thumbnail_obj
}) => {

    const classes = useStyles({ isFree })

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className={classes.fuelHero}>
                    <div className={classes.fuelHeroTitle}>Neso Fuel</div>
                    <p className={classes.fuelHeroSubtitle}>{subscription.isSubscribed ? "You have access to the following contents" : "Get Neso Fuel to access the following contents"}</p>
                </div>
                <Videos
                    isLecturesOnlyCourse={true}
                    courseName={courseName}
                    chapName={chapter_name} // TODO: no need for this
                    user={user}
                    subscription={subscription}
                    lectureProgresses={filterUserProgress(lectureProgresses, course_id)}
                    free={isFree}
                    endPointValue={course_id}
                    videos={createLecturesMergedArray(lectures_obj, lec_thumbnail_obj)}
                />
            </div>
        </div>
    )
}


export default SubjectLecturesList;