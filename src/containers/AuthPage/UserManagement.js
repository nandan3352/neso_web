import { CircularProgress, Dialog } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import EmailVerification from "../../components/UserManagement/EmailVerification/EmailVerification";
import ResetPassword from "../../components/UserManagement/ResetPassword/ResetPassword";
import VerificationError from "../../components/UserManagement/VerificationError/VerificationError";
import {
  applyActionCode,
  getAuth,
  verifyPasswordResetCode,
} from "firebase/auth";

const UserManagement = ({ match, location }) => {
  var searchParams = new URLSearchParams(location.search);

  const [verifyEmail, setverifyEmail] = useState(null);
  const [resetPassword, setResetPassword] = useState(null);
  const [resetPasswordDone, setResetPasswordDone] = useState(null);
  const [error, setError] = useState(false);

  var mode = searchParams.get("mode");
  var actionCode = searchParams.get("oobCode");
  var continueUrl = searchParams.get("continueUrl");
  var lang = searchParams.get("lang") || "en";
  var apiKey = searchParams.get("apiKey");

  var auth = getAuth();

  useEffect(() => {
    switch (mode) {
      case "resetPassword":
        handleResetPassword(auth, actionCode, continueUrl, lang);
        break;
      case "recoverEmail":
        // Display email recovery handler and UI.
        //handleRecoverEmail(auth, actionCode, lang);
        break;
      case "verifyEmail":
        // Display email verification handler and UI.
        handleVerifyEmail(auth, actionCode, continueUrl, lang);
        break;
      case "signIn":
        handleSignIn();
        break;
      default:
      // Error: invalid mode.
    }
  }, []);

  const loader = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CircularProgress color="secondary" />
    </div>
  );

  return (
    <>
      <div style={{ height: "100vh" }} />
      <Dialog fullScreen open={true}>
        {error ? (
          <VerificationError />
        ) : mode === "verifyEmail" ? (
          <>
            {verifyEmail !== null ? (
              <EmailVerification verified={verifyEmail} emailVerification />
            ) : (
              loader
            )}
          </>
        ) : (
          <>
            {mode === "resetPassword" && resetPassword ? (
              <>
                {!resetPasswordDone ? (
                  <ResetPassword
                    actionCode={actionCode}
                    statusState={setResetPasswordDone}
                  />
                ) : (
                  <EmailVerification verified={true} />
                )}
              </>
            ) : (
              loader
            )}
          </>
        )}
      </Dialog>
    </>
  );

  function handleVerifyEmail(auth, actionCode, continueUrl, lang) {
    applyActionCode(auth, actionCode)
      .then((resp) => {
        setverifyEmail(true);
      })
      .catch((error) => {
        setError(true);
        setverifyEmail(false);
        console.log(error.message);
      });
  }

  function handleResetPassword(auth, actionCode, continueUrl, lang) {
    verifyPasswordResetCode(auth, actionCode)
      .then((email) => {
        setResetPassword(true);
      })
      .catch((error) => {
        console.log(error.message);
        setError(true);
        // Invalid or expired action code. Ask user to try to reset the password
        // again.
      });
  }

  function handleSignIn() {
    window.open(
      `${continueUrl}?apiKey=${apiKey}&mode=${mode}&oobCode=${actionCode}&lang=${lang}`,
      "_self"
    );
  }
};

export default UserManagement;
