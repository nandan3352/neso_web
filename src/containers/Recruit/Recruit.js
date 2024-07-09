// import React from 'react'

// const Recruit = () => {
//   return (
//     <div>
//       Recruit
//     </div>
//   )
// }

// export default Recruit

import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import ButtonBase from "@material-ui/core/ButtonBase";
// import { makeStyles } from "@material-ui/core/styles";
import Body from "./Body";
import Gform from "./GformBody";

import "./Recruit.css";
import { SnackbarEvent, useEventDispatch } from "../../Services/Events";

import { Container, CircularProgress } from "@material-ui/core";
import { useDatabase } from "../../Services/Database";
import CareerIcon from "./CareerIcon";
//TODO : refactor this component to update state from database
const Recruit = () => {
  const dispatchSnackbar = useEventDispatch(SnackbarEvent);
  const availableRecruits = useDatabase("/Careers").data;

  const [openCustomResume, setOpenCustomResume] = useState(false);
  const [openForm, setOpenForm] = useState("");

 
  const handleCustomResume = () => {
    setOpenCustomResume(true);
  };

  const handleResumeClose = () => {
    setOpenCustomResume(false);
  };

  const handleFormClose = () => {
    setOpenForm("");
  };

  const handleForm = (type) => () => {
    setOpenForm(type);
  };

  const disableEvent = () => {
    dispatchSnackbar({
      msg: "Applications for this post is currently closed.",
      open: true,
    });
  };

  useEffect(() => {
    document.title = "Careers | Neso Academy";
  }, []);

  const getForm = (type) => {
    if ("" === type) {
      return <div></div>;
    }
    return (
      <Gform
        close={handleFormClose}
        title={availableRecruits[type]["title"]}
        link={availableRecruits[type]["link"]}
      />
    );
  };

  const getClasses = (active) => {
    return `recruitCard ${active ? "active" : "disabledRecruitCard"}`;
  };

  const handleClick = (type) => {
    if (!availableRecruits[type]["enabled"]) {
      return disableEvent;
    } else {
      if (type === "teacher") {
        return handleCustomResume;
      } else {
        return       
      }
    }
  };

  if (!availableRecruits)
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="secondary" />
      </div>
    );

  return (
    <Container>
      {/* Resume */}
      <Modal
        open={openCustomResume}
        onClose={handleResumeClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Body />
      </Modal>
      {/* Embeded forms */}
      <Modal
        open={Boolean(openForm)}
        onClose={() => setOpenForm("")}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {getForm(openForm)}
      </Modal>
      <div className="recruitTitleWrapper">
        <p className="recruitTitle">Work with us!</p>
        <p className="recruitSubTitle">
          Neso Academy is seeking dynamic people who can create world class
          study materials. We believe in "Education for All" and hold our core
          values close. If you are ambitious, talented and motivated we would
          love to hear from you.
        </p>
      </div>
      <div className="recruitCardsWrapper">
        <Grid container spacing={4}>
          {Object.entries(availableRecruits)
            .sort(([, a], [, b]) => a.order - b.order)
            .map(([key, value]) => {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  <ButtonBase 
                    target={key !== "teacher" && value.enabled && "_blank"} 
                    href={(key !== "teacher" && value.enabled) && value.link}
                    className={getClasses(value.enabled)}
                    onClick={handleClick(key)}
                  >
                    <div className="recruitContent">
                      <CareerIcon type={key} enabled={value.enabled}  />                  
                      <p className="recruitContentTitle">{value.title}</p>
                      <div className="recruitContentBody">
                        {value.description}
                      </div>
                    </div>
                  </ButtonBase>
                </Grid>
              );
            })}
        </Grid>
      </div>
    </Container>
  );
};

export default Recruit;


