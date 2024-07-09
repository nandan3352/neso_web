import React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SendIcon from "@material-ui/icons/Send";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { firestoreAddDoc, firestoreSetDoc } from "../../Services/Database";
import { serverTimestamp } from "firebase/firestore";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  bottom: {
    justifySelf: "end",
    display: "flex",
    minHeight: "56px",
    padding: "0px 4px",
  },
  imgPreview: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    maxHeight: "calc(100% - 56px)",
  },
  imgRoot: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FB",
    maxHeight: "calc(100% - 56px)",
  },
  img: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  header: {
    padding: "8px",
    fontWeight: "500",
    fontSize: "20px",
    lineHeight: "24px",
    letterSpacing: "0.15px",
    color: theme.palette.text.primary,
  },
  icoButton: {
    color: theme.palette.secondary.main,
  },
  inp: {
    width: "100%",
    padding: "8px",
  },
}));

function 
BottomBar(props) {
  const classes = useStyles();

  const [text, setText] = useState("");
  const [uploading, setUploading] = useState(false);

  function uploadImg(e) {
    props.setImgPreview(e.target.files[0]);
  }

  function send() {
    setUploading(true);

    var message = {
      img: null,
      message: text,
      timestamp: serverTimestamp(),
      user: "user",
    };

    function addMessage() {
      const obj = {
        timestamp: serverTimestamp(),
      };
      firestoreSetDoc(`SupportChat/${props.uid}`, obj).then(() => {
        firestoreAddDoc(`SupportChat/${props.uid}/Messages`, message)
          .then(() => {
            setText("");
            setUploading(false);
            props.setImgPreview(false);
          })
          .catch((err) => {
            console.log(err);
            setUploading(false);
          });
      });
    }

    if (props.imgPreview !== false) {
      //upload img and set dload url
      const imgName = new Date().getTime().toString() + ".png";

      const storageRef = ref(
        getStorage(),
        `SupportChat/${props.uid}/${imgName}`
      );

      uploadBytes(storageRef, props.imgPreview)
        .then((snap) => {
          getDownloadURL(snap.ref).then((url) => {
            message.img = url;
            addMessage();
          });
        })
        .catch((err) => {
          console.log(err);
          setUploading(false);
        });
    } else addMessage();
  }

  return (
    <div
      className={classes.root}
      style={props.imgPreview ? { height: "100%" } : {}}
    >
      {props.imgPreview && (
        <div className={classes.imgPreview}>
          <div className={classes.header}>
            <IconButton
              style={{ marginRight: "8px", height: "40px", width: "40px" }}
              disabled={uploading}
            >
              <CloseIcon onClick={() => props.setImgPreview(false)} />
            </IconButton>
            {uploading ? "Uploading ..." : "Preview"}
          </div>
          <Divider />

          {/* <Skeleton variant='rect' animation='wave' style={{flex:'1'}}/> */}
          <div className={classes.imgRoot}>
            <img
              className={classes.img}
              src={URL.createObjectURL(props.imgPreview)}
              alt=""
            />
          </div>
        </div>
      )}
      <Divider />
      <CardActionArea className={classes.bottom}>
        {!props.imgPreview && (
          <div>
            <input
              type="file"
              accept="image/*"
              id="imgUploadCS"
              hidden
              onChange={uploadImg}
            />

            <label htmlFor="imgUploadCS">
              <IconButton
                classes={{ root: classes.icoButton }}
                component="span"
              >
                <AddIcon />
              </IconButton>
            </label>
          </div>
        )}

        <InputBase
          className={classes.inp}
          placeholder={
            props.imgPreview ? "Add a Caption ..." : "Type a message..."
          }
          multiline={true}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <IconButton
          classes={{ root: classes.icoButton }}
          disabled={uploading || (text == "" && props.imgPreview == false)}
          onClick={send}
        >
          <SendIcon htmlColor="#018786" />
        </IconButton>
      </CardActionArea>
    </div>
  );
}

export default BottomBar;
