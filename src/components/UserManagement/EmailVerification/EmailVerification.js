import { Dialog } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./EmailVerification.css";

const EmailVerification = (props) => {


    return (
        <Dialog fullScreen open={true} >
            <div className="verification-container">
                <svg className="verification-icon" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="56" height="56" rx="4" fill="#219653" fill-opacity="0.16" />
                    <path d="M22.1364 36.3582L13.7841 27.8955L11 30.7164L22.1364 42L46 17.8209L43.2159 15L22.1364 36.3582Z" fill="#27AE60" />
                </svg>
                {props.emailVerification ?
                    <>
                        <h6 className="verification-title">Neso Academy </h6>
                        <p className="verification-content">Your email has been confirmed successfully</p>
                    </>
                    :
                    <>
                        <h6 className="verification-title">Reset your password</h6>
                        <p className="verification-content">Your password has been changed successfully. Please log in to continue,</p>
                    </>
                }
                <Link replace to={props.continueUrl ? props.continueUrl : "/"}>
                    <button className="verification-btn" style={{ cursor: "pointer" }}>
                        <h6 className="ctn">go to neso academy</h6>
                    </button>
                </Link>

            </div>
        </Dialog>
    )
}

export default EmailVerification;