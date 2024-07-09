import React from "react";
import Dialog from "@material-ui/core/Dialog";
import QuestionMainPage from "../QuizQuestionPage/QuestionMainPage";
import { navigate, useNavigate } from "react-router-dom";

const QuizMainPageHolder = (pprops) => {

  const props = useNavigate().location.state

  if (props === undefined) {
    return <navigate to='/' />
  }

  const level = props.level

  return (
    <div style={{ height: '100vh' }}>
      <Dialog
        disableScrollLock={false}
        style={{ zIndex: 1302 }}
        fullScreen
        open={true}>
        <QuestionMainPage quizData={props.data} id={props.id} level={level} />
      </Dialog>
    </div>
  );
};

export default QuizMainPageHolder;
