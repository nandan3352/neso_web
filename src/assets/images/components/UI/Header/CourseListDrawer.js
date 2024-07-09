import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Grid, Container } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useDatabase } from "../../../Services/Database";
import { Link } from "react-router-dom";
import { getEndpointForId } from "../../../Services/Utils";

const useStyle = makeStyles((theme) => ({
  drawerPaperRoot: {
    background: theme.palette.background.surface,
  },
  navLinkWithDropDown: {
    ...theme.typography.subtitle1,
    display: "flex",
    padding: "18px 0px",
    alignItems: "center",
    marginRight: theme.spacing(3),
    lineHeight: "24px",
    color: theme.palette.text.primary,
    fontSize: "16px",
    "&:hover": {
      textDecoration: "none",
      cursor: "pointer",
    },
  },
  courseList: {},
  courseListItem: {
    ...theme.typography.subtitle1,
    color: theme.palette.text.primary,
  },
  subjectList: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    columnGap: 16,
    padding: "16px 0px",
    justifyItems: "flex-start",
    alignItems: "center",
  },

  subjectListItem: {
    ...theme.typography.subtitle1,
    fontSize: "16px",
    lineHeight: "24px",
    color: theme.palette.text.secondary,
    paddingTop: "10px",
    paddingBottom: "10px",
    "&:hover": {
      textDecoration: "none",
      cursor: "pointer",
    },
  },
}));

export default function CourseListDrawer(props) {
  const courses = useDatabase("StreamCourses").data;
  const streams = useDatabase("Streams").data;
  const classes = useStyle();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [selectedIndex, setSelected] = React.useState(0);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(open);
  };

  /* Desktop */
  const arrowIndicator = (selected) => (
    <ArrowDropDownIcon
      style={{ opacity: selected ? 1 : 0, transform: "rotate(-90deg)" }}
    />
  );

  const CourseList = (anchor) => {
    if (!courses || !streams) {
      return <div></div>;
    }
    let renderStreams = Object.entries(streams).sort(
      ([, a], [, b]) => a.priority - b.priority
    );
    return (
      <div
        className={classes.drawerPaperRoot}
        role="presentation"
        style={{ marginTop: "60px", display: "flex" }}
      >
        <Container>
          <Grid spacing={20} alignItems="flex-start" container>
            {/* Courses */}
            <Grid xs={3} item>
              <List>
                {renderStreams.map(([, stream], index) => (
                  <ListItem
                    onClick={() => setSelected(index)}
                    button
                    key={stream.name}
                  >
                    <ListItemText primary={stream.name} />
                    {arrowIndicator(selectedIndex === index)}
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid style={{ marginLeft: "16px" }} lg={8} md={8} xs={6} item>
              <div className={classes.subjectList}>
                {Object.entries(
                  Object.entries(courses).find(
                    ([sk, c]) => sk === renderStreams[selectedIndex][0]
                  )[1]
                ).map(([key, subject], index) => (
                  <Link
                    to={getEndpointForId(key, subject.name)}
                    className={classes.subjectListItem}
                    onClick={() => {
                      setOpenDrawer(false);
                    }}
                  >
                    {subject.name}
                  </Link>
                ))}
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  };

  const courseDropDown = (
    <div
      style={{ textDecoration: "none" }}
      className={classes.navLinkWithDropDown}
      variant="subtitle1"
      // onMouseEnter={toggleDrawer(true)}
      onClick={toggleDrawer(!openDrawer)}
    >
      Courses
      <ArrowDropDownIcon
        style={{
          transition: "all 300ms",
          transform: openDrawer ? "rotate(180deg)" : "rotate(0deg)",
        }}
      />
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
      }}
    >
      {courseDropDown}
      <Drawer
        BackdropProps={{
          onMouseEnter: toggleDrawer(false),
        }}
        disableScrollLock
        style={{ zIndex: 5 }}
        anchor="top"
        open={openDrawer}
        onClose={toggleDrawer(false)}
      >
        {CourseList("top")}
      </Drawer>
    </div>
  );
}
