import { Dialog, useMediaQuery, useTheme } from "@material-ui/core"
import { useEffect, useState } from "react"
import { navigate, useNavigate } from "react-router"
import QuizStartPage from "./QuizStartPage"



const QuizStartMobile = (props) => {

    const history = useNavigate()

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
    const [init, setInit] = useState(false)
    useEffect(() => {
        if (!init) {
            setInit(true)
        }
        return () => {
        }
    }, [isMobile])

    const state = history.location.state

    if (!state || (!isMobile && init)) {
        return <navigate to='/' />
    }


    const level = state.level
    const id = state.id
    const data = state.data
    const from = state.from
    const uid = state.uid


    if (!(level && id && data))
        history.goBack()

    return <Dialog open style={{ zIndex: 1 }} fullScreen>
        <div style={{ marginTop: 56, height: '100%' }}>
            <QuizStartPage fromMobile uid={uid} level={level + ''} handleClose={() => history.goBack()} id={id} quizData={data} />
        </div>
    </Dialog>

    //return <QuizStartPage fromMobile uid={uid} level={level + ''} handleClose={() => history.goBack()} id={id} quizData={data} />

}

export default QuizStartMobile