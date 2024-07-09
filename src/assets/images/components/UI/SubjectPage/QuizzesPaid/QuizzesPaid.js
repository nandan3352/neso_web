import React from 'react';
import './QuizzesPaid';
import Quiz from '../Quiz/Quiz';
import { Link } from "react-router-dom";
import PFButton from '../../../UI/Buttons/Primary/Filled/Button';
import POButton from '../../../UI/Buttons/Primary/Outline1/Button';
import { useTheme } from "@material-ui/core";


function QuizzesPaid(props) {
    const theme = useTheme().palette.type;

    return (
        <section className='paid-chapters'>
            <div style={{ maxWidth: 783.3 }}>
                <div className='get-fuel-paid'>
                    {!props.subscription.isSubscribed ?
                        <>
                            <div className="get-fuel-details">
                                <h6>Neso Fuel</h6>
                                <p>Get Neso Fuel to access the following contents</p>
                            </div>
                            <Link to="../fuel">
                                <div className='paid-btn'>
                                    {theme === "light" ?
                                        <PFButton className="paid-btn"
                                            content="get fuel"
                                            width="104px"
                                        /> :
                                        <POButton className="paid-btn"
                                            content="get fuel"
                                            width="104px"
                                        />
                                    }
                                </div>
                            </Link>
                        </>
                        :
                        <div className="get-fuel-details">
                            <h6>Neso Fuel</h6>
                            <p>You have access to the following contents</p>
                        </div>
                    }
                </div>
                {props.quizzes.map((element, index) => {
                    //allow onCLick only on subscription is bought
                    return <Quiz disabled={props.fetchingQuizIndex > 0} showLoader={props.fetchingQuizIndex === (props.lengthFree + index + 1)} totQuestions={element.tq} endPointValue={props.endPointValue} subscription={props.subscription} handleQuiz={props.subscription.isSubscribed ? props.handleQuiz(props.lengthFree + index + 1) : null/* props.handleQuiz */} key={index} name={element.name} number={index + 1 + props.lengthFree} free={props.subscription.isSubscribed ? true : false} />
                })}
            </div>
        </section>
    )
}

export default QuizzesPaid;