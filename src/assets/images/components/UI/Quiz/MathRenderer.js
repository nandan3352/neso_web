import "../../UI/Notes/syntax-highlighting-styles.css";
import { removeMathJaxDelimiterSyntax } from "../../../containers/Quiz/QuizQuestionPage/QuestionBody";
import { useEffect, useRef } from "react";
import notestyles, { mobileScreenStyles } from "../../UI/Notes/notesStyles.js";
import { makeStyles } from "@material-ui/core";

/**
 * V2.0 math rendering Component
 *
 * Uses katexs autoRendering for latext , separates latex from markdown
 *
 */

const useStyle = makeStyles((theme) => ({
  root: {
    ...notestyles,
    fontFamily: 'Lato, Roboto',
    [theme.breakpoints.down("xs")]: {
      margin: "24px 0px",
      ...mobileScreenStyles,
    },
  },
}));

const MathRenderer = (props) => {
  const classes = useStyle();
  const quizContent = useRef();
  useEffect(() => {
    if (quizContent.current) {
      console.log("Hello rendering");
      window.Prism.plugins.autoloader.languages_path =
        "https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/components/";
      window.Prism.highlightAllUnder(quizContent.current);
      window.renderMathInElement(
        document.body,
        {
            delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "\\[", right: "\\]", display: true },
                { left: "$", right: "$", display: false },
                { left: "\\(", right: "\\)", display: false }
            ]
        }
    );
    }
  }, [quizContent, props.source]);

  if (!props.source.replace) {
    return null;
  }

  const source = removeMathJaxDelimiterSyntax(props.source);

  return (
    <div ref={quizContent} className={classes.root}>
      <div
        className={props.className}
        dangerouslySetInnerHTML={{ __html: source }}
      ></div>
    </div>
  );
};

export default MathRenderer;
