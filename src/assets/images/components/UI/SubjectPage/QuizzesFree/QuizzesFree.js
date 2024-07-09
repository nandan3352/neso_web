import React from 'react';
import Quiz from '../Quiz/Quiz';
import './QuizzesFree.css';

function QuizzesFree(props) {
    return (
        <section className='free-quiz' style={props.lengthPaid == 0 ? { borderStyle: "none" } : {}}>
            {props.quizzes.map((element, index) => {
                return <Quiz disabled={props.fetchingQuizIndex > 0} showLoader={props.fetchingQuizIndex === (index + 1)} totQuestions={element.tq} handleQuiz={props.handleQuiz(index + 1)} key={index} name={element.name} number={index + 1} free={true || props.subscription.isSubscribed} />
            })}
        </section>
    )
}

export default QuizzesFree;