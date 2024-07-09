import { useEffect, useState } from "react";
import { useDatabase } from "../../Services/Database";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 960,
    margin: "auto",
  },
  expanded: {},
  accordion: {
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&::before": {
      display: "none",
    },
    "&$expanded": {
      margin: 0,
    },
  },
  question: {
    ...theme.typography.subtitle1,
    fontWeight: 500,
  },
  answer: {
    ...theme.typography.body1,
    color: theme.palette.text.secondary,
  },
  centered: {
    display: "flex",
    justifyContent: "center",
    padding: 32,
  },
}));

const FaqList = () => {
  const request = useDatabase("/Faq");
  const [faqs, setFaqs] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (request.data) {
      const response = Object.entries(request.data)
        .map(([id, val]) => ({ ...val, id }))
        .sort((a, b) => a.order - b.order);
      setFaqs(response);
    }
  }, [request.data]);

  if (request.loading) {
    return (
      <div className={classes.centered}>
        <CircularProgress color="secondary" size={24} />
      </div>
    );
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      {faqs?.map((faq) => (
        <Accordion
          expanded={expanded === faq.id}
          onChange={handleChange(faq.id)}
          classes={{
            root: classes.accordion,
            expanded: classes.expanded,
          }}
          disableGutters
          elevation={0}
          square
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <div className={classes.question}>{faq.q}</div>
          </AccordionSummary>
          <AccordionDetails>
            <div
              className={classes.answer}
              dangerouslySetInnerHTML={{ __html: faq.ans }}
            ></div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FaqList;
