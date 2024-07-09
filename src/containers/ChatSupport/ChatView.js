import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Image from "../../components/UI/Image/Image";

const useStyles = makeStyles((theme) => ({
  scrollView: {
    flex: 1,
    overflowY: "auto",
  },
  centerVertical: {
    padding: "20px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    //alignItems:'center'
  },
  chatView: {
    boxSizing: "border-box",
    minHeight: "100%",
    display: "flex",
    padding: "20px",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  img: {
    width: "calc(100% + 32px)",
    //minWidth:'100px',
    margin: "-8px -16px",
    cursor: "pointer",
  },
  date: {
    margin: "12px",
    color: theme.palette.text.secondary,
  },
  chatCard: {
    boxSizing: "border-box",
    maxWidth: "55.3%",
    borderRadius: "16px",
    padding: "8px 16px",
    margin: "4px 0px",
  },
  imgCard: {
    boxSizing: "border-box",
    width: "35.3%",
    borderRadius: "16px",
    padding: "8px 16px",
    margin: "4px 0px",
  },
  sent: {
    alignSelf: "flex-end",
    marginTop: "16px",
    color: theme.palette.text.disabled,
  },
  supportHi: { color: theme.palette.text.primary, lineHeight: "56px" },
  supportText: { opacity: 0.6 },
  msgWrapper: {
    maxWidth: "260px",
    padding: "8px 16px",
    color: "#018786",
    backgroundColor: "rgba(1,135,134, 12%)",
    fontSize: "12px",
    lineHeight: "16px",
    letterSpacing: "0.4",
  },
}));

function prepareChatList(query) {
  var chatList = [];
  var hashMap = {};
  query.forEach((doc) => {
    var ts = doc.data().timestamp
      ? new Date(doc.data().timestamp.seconds * 1000)
      : new Date();

    var date = ts.toDateString().split(" ").slice(1).join(" ");
    var date_time =
      date +
      " " +
      ts.toLocaleTimeString("en-US", {
        hour12: true,
        minute: "numeric",
        hour: "numeric",
      });
    var data = doc.data();
    if (!(date in hashMap)) {
      hashMap[date] = true;
      chatList.push({ date: true, content: date_time });
    }

    chatList.push({ content: data });
  });
  return chatList;
}

function ChatView(props) {
  const classes = useStyles();
  var chatList = prepareChatList(props.snapshot);
  const [loading, setLoading] = useState(true);

  //scroll to bottom
  useEffect(() => {
    if (chatList.length > 0) setLoading(false);
    if (!loading) {
      const scrollView = document.getElementsByClassName(classes.scrollView)[0];
      if(scrollView){
        scrollView.scrollTop = scrollView.scrollHeight;
      }
    }
  }, [chatList, loading]);

  // if(loading) return(
  //     <div className={classes.centerVertical}>
  //                 <Skeleton variant='text' animation='wave' style={{width:'100%'}}/>
  //                 <Skeleton variant='text' animation='wave' style={{width:'75%'}}/>
  //     </div>
  // )

  return props.isEmpty ? (
    <div
      className="chat-wrapper"
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        marginLeft: "36px",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" className={classes.supportHi}>
        Contact us!
      </Typography>
      <Typography variant="subtitle1" className={classes.supportText}>
        Please let us know if you <br />
        have any queries.
      </Typography>
    </div>
  ) : (
    <div className={classes.scrollView}>
      <div className={classes.chatView}>
        {chatList.map((item) => {
          if (item.date)
            return (
              <Typography variant="body2" className={classes.date}>
                {item.content}
              </Typography>
            );
          else
            return (
              <Card
                className={
                  item.content.img == null ? classes.chatCard : classes.imgCard
                }
                variant="outlined"
                style={
                  item.content.user == "user"
                    ? { alignSelf: "flex-end", borderRadius: "16px" }
                    : {
                        alignSelf: "flex-start",
                        backgroundColor: "rgba(33, 33, 33, 0.08)",
                        borderColor: "#00000000",
                        borderRadius: "16px",
                      }
                }
              >
                {item.content.img != null && (
                  //image with preloader
                  <Image
                    src={item.content.img}
                    className={classes.img}
                    skeletonHeight="23.5vh"
                    skeletonWidth="100%"
                    onClick={() => window.open(item.content.img, "_blank")}
                  />
                )}

                <Typography
                  variant="body2"
                  style={{
                    overflowWrap: "anywhere",
                    marginTop:
                      item.content.img == null
                        ? "0px"
                        : item.content.message == ""
                        ? "-8px"
                        : "16px",
                  }}
                >
                  {item.content.message}
                </Typography>
              </Card>
            );
        })}
        {chatList.length > 0 &&
          chatList.slice(-1)[0].content.user == "user" && (
            <Typography className={classes.sent} variant="caption">
              Sent
            </Typography>
          )}
        {chatList[chatList.length - 1] &&
          chatList[chatList.length - 1].content.user === "user" && (
            <div className={classes.msgWrapper}>
              Thank you for contacting us. We’ll get back to you within 24
              hours. Please visit this page for the response from the team.
            </div>
          )}
      </div>
    </div>
  );
}

export default ChatView;
