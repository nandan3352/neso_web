import React, { useCallback, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import { Fade } from "@material-ui/core";
import ChatEmbedable from "../../../../containers/ChatSupport/ChatEmbedable";
import { useUser } from "../../../../Services/Auth";
import FaqEmbeddable from "../../../../containers/FAQ/FaqEmbeddable";
import { AuthDialogEvent, useEventDispatch } from "../../../../Services/Events";

const StyledMenu = withStyles({
  paper: {
    transition: "all 225ms ease-in !important",
    border: "1px solid rgba(var(--theme-overlay-border))",
    height: 536,
    width: 325,
    left: "unset !important",
    top: "unset !important",
    right: 30,
    bottom: 95,
  },
})((props) => (
  <Menu
    disableScrollLock
    elevation={0}
    TransitionComponent={Fade}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

export default function ChatOverlay({ anchorEl, handleClose, close }) {
  const [showChat, setShowChat] = useState(false);
  const user = useUser();
  const dispatchAuth = useEventDispatch(AuthDialogEvent);

  const handleSupport = useCallback(() => {
    if (user) {
      setShowChat(true);
    } else {
      dispatchAuth({ open: true, msg: "Kindly Login to get support." });
    }
  }, [setShowChat, dispatchAuth, user]);

  return (
    <div>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ disablePadding: true }}
      >
        {showChat ? (
          <ChatEmbedable close={close} />
        ) : (
          <FaqEmbeddable btnText="Message" switchSupport={handleSupport} />
        )}
      </StyledMenu>
    </div>
  );
}
