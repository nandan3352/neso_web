import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { ReactComponent as FailIon } from "./close.svg";
import "./VerificationError.css";
// import { makeStyles } from "@material-ui/styles";

// const useStyle = makeStyles(theme => ({
//     title: {
//         marginTop: "47px",
//         color: theme.palette.text.primary,
//     },
//     content: {
//         marginTop: "32px",
//         color: theme.palette.text.secondary,
//     }
// }))

function VerificationError(props) {
    // const styles = useStyle();

    return (
        <div className="top-wrapper">
            <div className="error-container">
                <FailIon className="fail-icon" />
                <Typography variant="h6" 
                // className={styles.title}
                >Sorry, the session has expired</Typography>
                <Typography variant="subtitle1" 
                // className={styles.content}
                >
                    The link has expired. Please generate a new request to continue.</Typography>
                <Link to={props.continueUrl ? props.continueUrl : "/"}>
                    <button className="fail-btn" style={{ cursor: "pointer" }}>
                        <h6 className="fail-ctn">go to neso academy</h6>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default VerificationError;