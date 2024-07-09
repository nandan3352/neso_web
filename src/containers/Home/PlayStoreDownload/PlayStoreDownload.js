import React from "react";
import "./PlayStoreDownload.css";
import Scan from "../../../assets/images/QRcode/Scan.svg";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core"

function rand() {
  return Math.round(Math.random() * 20) - 100;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const PlayStoreDownload = () => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div
      style={{ top: "50vh", left: "50vw", transform: "translate(-50%, -50%)" }}
      className="main-modal"
    >
      <div className="cross-div">
        <div style={{ flexGrow: "1" }} />
        <div onClick={handleClose} style={{ cursor: "pointer" }}>
          <CloseIcon className="cross-img" />
          {/*<img src={Cross} alt="" className="cross-img" />*/}
        </div>
      </div>
      <div className="modal-split">
        <div className="left-split-modal">
          <div className="scan-img-div">
            <img src={Scan} alt="" className="scan-img" />
          </div>
          <p className="scan-me-text">Scan me!</p>
          <p className="scan-me-desc">
            Download the Neso Academy app by scanning the above QR code.
          </p>
        </div>
        <div className="growing-modal" />
        <div>
          <img src='https://firebasestorage.googleapis.com/v0/b/neso-c53c4.appspot.com/o/ImageResource%2FWebsiteResource%2Fscanme.webp?alt=media&token=add61b85-b8ba-46ed-89f6-2fd0ad850037' alt="" className="phone-img-modal" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="outer-psd">
      <div className="main-psd">
        <div className="psd-flex">
          <div className="sm-max">
            <div className="align-left">
              <p className="neso-title-psd">Neso Academy App</p>
              <p className="neso-desc-psd">
                Download the Neso Academy app from Playstore.
              </p>
              <div className="get-it-on-ps">
                <a
                  href="https://play.google.com/store/apps/details?id=org.nesoacademy"
                  target="_blank" rel="noreferrer"
                >
                  <img src='https://firebasestorage.googleapis.com/v0/b/neso-c53c4.appspot.com/o/ImageResource%2FWebsiteResource%2FgetItOnGooglePlay.webp?alt=media&token=11f388b4-2564-4dd5-8ee6-038feb6e92b9' alt="" style={{ height: "48px", cursor: "pointer" }} />
                </a>
              </div>

              <Button onClick={handleOpen} className="scan-btn">SCAN QR CODE INSTEAD</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                {body}
              </Modal>
            </div>
          </div>
          <div className="flex-grow-psd"></div>
          <div className="psd-illu-div">
            <img src='https://firebasestorage.googleapis.com/v0/b/neso-c53c4.appspot.com/o/ImageResource%2FWebsiteResource%2FAndroidAppHomeLG.webp?alt=media&token=ecc817ea-eede-463b-970e-08dfea96e86a' alt="" className="img-psd-ill" />
          </div>
          <div className="psd-illu-div-sm">
            <img src='https://firebasestorage.googleapis.com/v0/b/neso-c53c4.appspot.com/o/ImageResource%2FWebsiteResource%2FAndroidAppHomeSM.webp?alt=media&token=4f1805c5-4937-4381-829e-445be0807580' alt="" className="img-psd-ill" />
          </div>
          <div className="psd-illu-div-xs">
            <img src='https://firebasestorage.googleapis.com/v0/b/neso-c53c4.appspot.com/o/ImageResource%2FWebsiteResource%2FAndroidAppHomeXS.webp?alt=media&token=dc5c1aa7-e48a-4436-90fb-0be2c8c8813c' alt="" className="img-psd-ill" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayStoreDownload;
