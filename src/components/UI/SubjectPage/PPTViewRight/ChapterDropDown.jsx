import {
    makeStyles,
    ListItemIcon,
    Popover,
    List,
    ListItem,
    ListItemText
} from "@material-ui/core";
import { useState } from "react";
import { KeyboardArrowDown, KeyboardArrowRight} from "@material-ui/icons";


const useStyle = makeStyles((theme) => ({
    dropDownIcon: {
        minWidth: 40,
    },

    dropDownListIcon: {
        minWidth: 24,
        padding: theme.spacing(1),
    },

    dropDownListItemText: {
        paddingRight: 8,
    },

    DropDownDialog: {
        border: `1px solid ${theme.palette.divider}`,
        maxWidth: 302,
    },

    DropDownheader: {
        ...theme.typography.subtitle2,
        padding: "20px 0px 16px 40px",
        borderBottom: `1px solid ${theme.palette.divider}`,
    },

    currentChapter: {
        paddingRight: 8,
        maxWidth: 302,
        maxHeight: 49,
    },

    popover: {
        margin: "0px 100px 0px",
    },
}))

const ChapterDropDown = ({ handleChapterChange, pptsArr, chapterid }) => {

    const [menuAnchorEl, setMenuAnchorEl] = useState(null);

    const classes = useStyle()

    const openMenu = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const handleChapterSelected = (event,index) => {
        handleMenuClose();
        handleChapterChange(event,index)
    }

    return (
        <>
            {pptsArr.length != 0 && (
                <List disablePadding>
                    <ListItem
                        disableGutters
                        button
                        className={classes.currentChapter}
                        onClick={openMenu}>
                        <ListItemIcon className={classes.dropDownIcon}>
                            <KeyboardArrowDown />
                        </ListItemIcon>
                        <ListItemText primary={pptsArr[chapterid - 1].name} />
                    </ListItem>
                </List>
            )}
            <Popover
                id="chapter-select"
                anchorEl={menuAnchorEl}
                disableScrollLock
                elevation={0}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}>
                {pptsArr.length != 0 && (
                    <List className={classes.DropDownDialog} disablePadding>
                        <div className={classes.DropDownheader}>Chapters</div>
                        {pptsArr.map((element, index) => {
                            return (
                                <ListItem
                                    disableGutters
                                    key={index}
                                    onClick={(event) => handleChapterSelected(event, index)}
                                    button>
                                    {index === chapterid - 1 ? (
                                        <ListItemIcon className={classes.dropDownListIcon}>
                                            <KeyboardArrowRight />
                                        </ListItemIcon>
                                    ) : (
                                        <div style={{ width: 40 }} />
                                    )}
                                    <ListItemText
                                        className={classes.dropDownListItemText}
                                        primary={element.name}
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                )}
            </Popover>
        </>
    )
}

export default ChapterDropDown