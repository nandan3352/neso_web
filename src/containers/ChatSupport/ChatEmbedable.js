import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import ChatView from "./ChatView";
import BottomBar from "./BottomBar";
import TopBar from "./TopBar";
import { useFirestoreDocumentList } from "../../Services/Database";
import { useState } from "react";
import "./ChatEmbedable.css";
import { useUser } from "../../Services/Auth";

const useStyles = makeStyles((theme) => ({
  centerVertical: {
    padding: "20px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  innerDiv: {
    display: "flex",
    flexDirection: "column",
    height: "534px",
  },
  header: {
    padding: "16px 24px",
    fontWeight: "500",
    fontSize: "20px",
    lineHeight: "24px",
    letterSpacing: "0.15px",
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.primary,
  },
}));

function ChatSupport(props) {
  const user = useUser();
  var uid = user && user.uid;
  var chatSnapshot = useFirestoreDocumentList(
    `SupportChat/${uid}/Messages`,
    "timestamp"
  );
  const [imgPreview, setImgPreview] = useState(false);

  const classes = useStyles();

  return (
    <div>
      <Card variant="outlined" id="innerRectChat">
        {imgPreview ? (
          <BottomBar
            uid={uid}
            imgPreview={imgPreview}
            setImgPreview={setImgPreview}
            isEmpty={chatSnapshot.empty}
          /> //only iflate bottombar
        ) : (
          <div className={classes.innerDiv}>
            <TopBar close={props.close} />
            <ChatView snapshot={chatSnapshot} isEmpty={chatSnapshot.empty} />
            <BottomBar
              uid={uid}
              imgPreview={imgPreview}
              setImgPreview={setImgPreview}
              isEmpty={chatSnapshot.empty}
            />
          </div>
        )}
      </Card>
    </div>
  );
}

export default ChatSupport;
