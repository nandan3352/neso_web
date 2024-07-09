import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./Tab.css";
import Comments from "./Comments/Comments";
import { useDatabaseOnce } from "../../../../Services/Database";
import NotesComponent from "../../../../components/UI/Notes/NotesComponent";
import { Hidden, useMediaQuery, useTheme } from "@material-ui/core";
import LeftSection from "../../LeftSection/LeftSection";
import { getIdCompsFromId } from "../../../../Services/Utils";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="tab-content"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {
        <Box style={{ padding: 0 }} p={3}>
          <Typography>{children}</Typography>
        </Box>
      }
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: 24,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 32,
    },
  },
  tabsRoot: {
    textTransform: "Capitalize",
    color: theme.palette.text.primary,
    boxShadow: "none",
    "&$selected": {
      color: theme.palette.primary.main,
    },
  },
  indicator: {
    backgroundColor: theme.palette.primary.main,
  },
  hide: {
    display: "none",
  },
  playlistTab : {
    display: "block",
    [theme.breakpoints.up("lg")] : {
      display : 'none'
    }
  },
  selected: {},
}));

export default function PlayerTabs({videos, id, canAccess,chapter, course, nextChapter}) {
  const {courseId, chapterId} = getIdCompsFromId(id);
  const lecNotes = useDatabaseOnce(`/NotesWeb/Lecture/${id}/data`).data;
  const classes = useStyles();
  const [value, setValue] = React.useState(1);
  const theme =  useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(() => {
    if(lecNotes){
      setValue(0);
    }else if(isLarge){
      setValue(2);
    }else{
      setValue(1);
    }
  },[isLarge, lecNotes]);

  const handleChange = (event, newValue) => {
    console.log(value);
    setValue(newValue);
  };

  return (
    <div className="Tab-Container">
      <Tabs
        className={classes.root}
        value={value}
        onChange={handleChange}
        aria-label="tabs"
        TabIndicatorProps={{
          className: classes.indicator,
        }}
      >
        <Tab
          value={0}
          className={!lecNotes && classes.hide}
          classes={{ selected: classes.selected, root: classes.tabsRoot }}
          label="Notes"
          {...a11yProps(0)}
        />
        <Tab
          className={classes.playlistTab}
          classes={{ selected: classes.selected, root: classes.tabsRoot }}
          label="Playlist"
          value={1}
          {...a11yProps(1)}
        />
        <Tab
          classes={{ selected: classes.selected, root: classes.tabsRoot }}
          label="Q&A"
          value={2}
          {...a11yProps(2)}
        />
      </Tabs>
      {lecNotes && (
        <TabPanel value={value} index={0}>
          <NotesComponent
            paid={lecNotes.paid}
            id={id}
            firstPage={lecNotes.firstPage}
            canAccess={!lecNotes.paid || canAccess}
            title={
              videos !== null &&
              videos[id] &&
              videos[id].vid_title
            }
          />
        </TabPanel>
      )}
      <Hidden lgUp>
        <TabPanel value={value} index={1}>
          <LeftSection
            nextChapter={nextChapter}
            scrollingParent={null}
            courseName={course && course.name}
            chapter={chapter}
            videos={videos}
            chapterId={chapterId}
            courseId={courseId}
            id={id}
          />
        </TabPanel>
      </Hidden>
      <TabPanel value={value} index={2}>
        <div>
          <Comments id={id} />
        </div>
      </TabPanel>
    </div>
  );
}