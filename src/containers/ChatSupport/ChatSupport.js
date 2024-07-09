import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import ChatView from "./ChatView";
import BottomBar from "./BottomBar";
import { useFirestoreDocumentList } from "../../Services/Database";
import { useState } from "react";
import "./ChatSupport.css";
import { useUser } from "../../Services/Auth";
import NoMatchPage from "../NoMatchPage/NoMatchPage";
import FaqEmbeddable from "../FAQ/FaqEmbeddable";

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
    height: "100%",
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

function ChatSupport() {
  const user = useUser();
  var uid = user && user.uid;
  var chatSnapshot = useFirestoreDocumentList(
    `SupportChat/${uid}/Messages`,
    "timestamp"
  );
  const [imgPreview, setImgPreview] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    document.title = "Chat Support | Neso Academy";
  }, []);

  if (!user) {
    return (
      <NoMatchPage info={`Please login to contact our Team.`} noButton={true} />
    );
  }

  return (
    <div id="rootSupport">
      <Card variant="outlined" id="innerRect">
        {imgPreview ? (
          <BottomBar
            uid={uid}
            imgPreview={imgPreview}
            setImgPreview={setImgPreview}
          /> //only iflate bottombar
        ) : (
          <div className={classes.innerDiv}>
            <div className={classes.header}>Support</div>
            <Divider />
            {chatSnapshot.empty ? (
              <FaqEmbeddable hideSupportLink={true} />
            ) : (
              <ChatView snapshot={chatSnapshot} isEmpty={chatSnapshot.empty} />
            )}
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
