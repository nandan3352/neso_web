import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonBase,
  Drawer,
  IconButton,
  makeStyles,
  switch,
} from "@material-ui/core";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import MoreVert from "@material-ui/icons/MoreVert";
import { useEffect, useState } from "react";
import { useDatabaseOnce } from "../../../../Services/Database";
import { Link } from "react-router-dom";
import clsx from "clsx";
import User from "../Overlay/User/User";
import { getEndpointForId } from "../../../../Services/Utils";

const useStyle = makeStyles((theme) => ({
  root: {},
  moreVert: {
    marginLeft: -8,
    marginRight: 4,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
      marginRight: -12,
    },
  },
  navList: {
    marginTop: 55,
    display: "flex",
    flexDirection: "column",
  },

  navItem: {
    justifyContent: "start",
    ...theme.typography.subtitle1,
    paddingLeft: theme.spacing(4),
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    fontSize: "16px",
    borderTop: `1px solid ${theme.palette.divider}`,
    "&:hover": {
      textDecoration: "none",
    },
  },

  darkMode: {
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(2),
    paddingTop: 9,
    paddingBottom: 9,
  },

  darkModeToggle: {},

  marginless: {
    padding: 0,
    minHeight: 0,
    margin: 0,
    "&$expanded": {
      minHeight: 0,
      margin: 0,
    },
  },

  courseItemRoot: {
    borderTop: `1px solid ${theme.palette.divider}`,
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: 0,
    },
  },

  hideTablet: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },

  expanded: {},

  courseItemContainer: {
    display: "flex",
    paddingLeft: theme.spacing(3),
    padding: theme.spacing(2),
    alignItems: "center",
  },
  course: {
    ...theme.typography.subtitle1,
    marginLeft: theme.spacing(1),
  },

  courseList: {
    display: "flex",
    flexDirection: "column",
  },

  courseItem: {
    marginLeft: theme.spacing(7),
    paddingBottom: theme.spacing(2),
    ...theme.typography.subtitle1,
    fontSize: "16px",
    lineHeight: "24px",
    color: theme.palette.text.primary,
    textDecoration: "none",
  },

  mobileComponents: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
    },
  },

  mobileLoginContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  mobileLoginButton: {
    width: 78,
  },

  Logintitle: {
    ...theme.typography.subtitle2,
  },
  LoginHint: {
    ...theme.typography.body2,
    color: theme.palette.grey[200],
  },
}));

const arrowIndicator = (selected) =>
  selected ? <KeyboardArrowDown /> : <KeyboardArrowRight />;

const MediumScreenOverlay = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const [selected, setSelected] = useState(-1);

  const classes = useStyle();

  const streams = useDatabaseOnce("Streams").data;
  const courses = useDatabaseOnce("StreamCourses").data;

  const handleChange = (panel) => (event, newExpanded) => {
    setSelected(newExpanded ? panel : -1);
  };

  useEffect(() => {
    const popEvent = async (e) => {
      e.preventDefault();
      setOpenDrawer(false);
    };
    if (openDrawer) window.addEventListener("popstate", popEvent);

    return () => {
      window.removeEventListener("popstate", popEvent);
    };
  }, [openDrawer]);

  const HandleNavigation = (route) => {
    return () => {
      props.navigator.push("/" + route);
      setOpenDrawer(false);
    };
  };

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const renderMobileAuthIdle = (
    <>
      <div
        style={{ paddingLeft: "16px" }}
        className={clsx(classes.mobileLoginContainer, classes.navItem)}
      >
        <div>
          <div className={classes.Logintitle}>Get started!</div>
          <div className={classes.LoginHint}>Sign up to Neso Academy</div>
        </div>
        <div className={classes.mobileLoginButton}>
          <Button
            onClick={HandleNavigation("login")}
            fullWidth
            color="secondary"
            variant="outlined"
          >
            Login
          </Button>
        </div>
      </div>
      <ButtonBase
        onClick={HandleNavigation("fuel")}
        className={classes.navItem}
        variant="subtitle1"
      >
        Get Neso Fuel
      </ButtonBase>
    </>
  );

  const renderMobileAuthLoggedIn = (
    <>
      <User handleClose={handleDrawer} />
      <ButtonBase
        style={{ borderTop: "none" }}
        className={classes.navItem}
        variant="subtitle1"
        onClick={HandleNavigation("fuel")}
      >
        Neso Fuel
      </ButtonBase>
      <ButtonBase
        onClick={HandleNavigation("notifications")}
        className={clsx(classes.navItem, classes.hideTablet)}
        variant="subtitle1"
      >
        Notifications
      </ButtonBase>
      <ButtonBase
        onClick={HandleNavigation("Account")}
        className={classes.navItem}
        variant="subtitle1"
      >
        Account
      </ButtonBase>
      <ButtonBase
        onClick={HandleNavigation("purchases")}
        className={classes.navItem}
        variant="subtitle1"
      >
        Purchases
      </ButtonBase>
      <ButtonBase
        onClick={HandleNavigation("history")}
        className={classes.navItem}
        variant="subtitle1"
      >
        History
      </ButtonBase>
      <ButtonBase
        onClick={HandleNavigation("bookmarks")}
        className={classes.navItem}
        variant="subtitle1"
      >
        Bookmarks
      </ButtonBase>
    </>
  );

  const streamsEntries =
    streams &&
    Object.entries(streams).sort(([, a], [, b]) => a.priority - b.priority);

  const renderCourseList =
    streamsEntries && courses ? (
      streamsEntries.map(([streamId, stream], index) => (
        <Accordion
          classes={{
            root: classes.courseItemRoot,
            expanded: classes.expanded,
          }}
          square
          expanded={selected === index}
          onChange={handleChange(index)}
        >
          <AccordionSummary
            classes={{
              root: classes.marginless,
              expanded: classes.expanded,
              content: classes.marginless,
            }}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <div className={classes.courseItemContainer}>
              {arrowIndicator(selected === index)}
              <div className={classes.course}>{stream.name}</div>
            </div>
          </AccordionSummary>
          <AccordionDetails
            classes={{
              root: classes.marginless,
            }}
          >
            <div className={classes.courseList}>
              {Object.entries(courses[streamId] || {}).map(([key, course]) => (
                <Link
                  to={getEndpointForId(key, course.name)}
                  className={classes.courseItem}
                  onClick={() => {
                    setOpenDrawer(false);
                  }}
                >
                  {course.name}
                </Link>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))
    ) : (
      <div />
    );

  const renderNavigations = (
    <div className={classes.navList}>
      <div className={classes.mobileComponents}>
        {props.loggedIn ? <div /> : renderMobileAuthIdle}
      </div>
      {props.loggedIn ? renderMobileAuthLoggedIn : <div />}
      <ButtonBase
        onClick={HandleNavigation("recommended-books")}
        className={classes.navItem}
        variant="subtitle1"
      >
        Books
      </ButtonBase>

      <div>{renderCourseList}</div>

      <div className={clsx(classes.darkMode, classes.navItem)}>
        Dark Mode
        <switch
          checked={props.darkMode.enabled}
          onChange={props.darkMode.handle}
          className={classes.darkModeToggle}
        />
      </div>

      {props.loggedIn && (
        <ButtonBase
          onClick={HandleNavigation("settings")}
          className={classes.navItem}
        >
          Settings
        </ButtonBase>
      )}    

      {props.loggedIn && (
        <ButtonBase
          onClick={HandleNavigation("support")}
          className={classes.navItem}
        >
          Chat support
        </ButtonBase>
      )}

      <a
        href="https://forum.nesoacademy.org"
        target="_blank"
        className={classes.navItem}
        rel="noopener noreferrer"
      >
        Forum
      </a>
      <ButtonBase
        onClick={HandleNavigation("careers")}
        className={classes.navItem}
      >
        We're Hiring
      </ButtonBase>

      <ButtonBase
        onClick={HandleNavigation("about")}
        className={classes.navItem}
      >
        About us
      </ButtonBase>
    </div>
  );

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(open);
  };

  return (
    <div className={classes.root}>
      {props.children ? (
        <props.children {...props.childProps} onClick={handleDrawer} />
      ) : (
        <IconButton className={classes.moreVert} onClick={handleDrawer}>
          <MoreVert />
        </IconButton>
      )}
      <Drawer
        style={{ zIndex: 5 }}
        anchor="top"
        open={props.tabletScreen && openDrawer}
        onClose={toggleDrawer(false)}
      >
        {renderNavigations}
      </Drawer>
    </div>
  );
};

export default MediumScreenOverlay;
