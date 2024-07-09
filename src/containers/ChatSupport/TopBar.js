import { makeStyles, Typography, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import React from "react";

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.text.primary,
        margin: "14px 0px 14px 16px"
    },
    div: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(var(--theme-divider))"
    }
}))

const Topbar = ({ close }) => {
    const style = useStyles()

    return (
        <div className={style.div}>
            <Typography variant="h6" className={style.title}>Chat Support</Typography>
            <IconButton onClick={() => close(null)}>
                <CloseIcon style={{ fontSize: 24 }} />
            </IconButton>
        </div>
    )
}

export default Topbar