import React, { useEffect } from 'react';
import QuizzesFree from '../QuizzesFree/QuizzesFree';
import QuizzesPaid from '../QuizzesPaid/QuizzesPaid';
import EmptyQuiz from '../EmptyQuiz/EmptyQuiz';
import './QuizSection.css';
import QuizStartDialog from '../../../../containers/Quiz/QuizStartPage/QuizStartDialog';
import { useQuizDispatchStates } from '../../../../Services/Utils';

function RightQuizzes(props) {

    const { userRecordFetchCompleteCallback, choosedQuizIndex, handleQuizChoosed, fetchingUserRecordIndex } = useQuizDispatchStates()

    useEffect(() => {
        if (props.openId) {
            try {
                const chap = parseInt(props.openId.split('-')[0])
                if (!isNaN(chap)) 
                    handleQuizChoosed(chap)()
                else {
                    props.nav.replace(props.path.split('/quiz')[0])
                }
            } catch (e) { }
        } else {
            handleQuizChoosed(-1)()
        }
    }, [props.openId])

    if (!props.quizzes) {
        return <EmptyQuiz />
    }

    let freeQuizzes = props.quizzes.filter(element => element.cost === 0);
    let paidQuizzes = props.quizzes.filter(element => element.cost !== 0);

    return (
        <section className="right-quizzes">
            <QuizStartDialog userRecordFetchCallback={userRecordFetchCompleteCallback} id={props.id + `_${choosedQuizIndex}`} level={1} open={choosedQuizIndex !== -1} handleClose={handleQuizChoosed(-1)} data={props.quizzes[choosedQuizIndex] || {}} />
            <QuizzesFree fetchingQuizIndex={fetchingUserRecordIndex} subscription={props.subscription} handleQuiz={handleQuizChoosed} quizzes={freeQuizzes} endPointValue={props.id} lengthPaid={paidQuizzes.length} />
            {(paidQuizzes.length > 0) && <QuizzesPaid fetchingQuizIndex={fetchingUserRecordIndex} endPointValue={props.id} subscription={props.subscription} handleQuiz={handleQuizChoosed} quizzes={paidQuizzes} lengthFree={freeQuizzes.length} />}
        </section>
    )
}

export default RightQuizzes;