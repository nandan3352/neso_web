import React from "react";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, SvgIcon, Typography, useTheme } from "@material-ui/core";
// import { ReactComponent as YouTube } from "../../../assets/images/SocialMediaIcons/YouTube.svg";
// import { ReactComponent as Facebook } from "../../../assets/images/SocialMediaIcons/Facebook.svg";
// import { ReactComponent as Instagram } from "../../../assets/images/SocialMediaIcons/Instagram.svg";
// import { ReactComponent as Twitter } from "../../../assets/images/SocialMediaIcons/Twitter.svg";
// import { ReactComponent as LinkedIn } from "../../../assets/images/SocialMediaIcons/LinkedIn.svg";
import Container from "@material-ui/core/Container";
// import IndiaFlag from "../../../assets/images/Logos/india.svg";
import "./Footer.css";
import Hidden from "@material-ui/core/Hidden";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  gridContainer: {
    paddingTop: theme.spacing(8),
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingBottom: 32,
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(6),
    },
  },

  copyright: {
    ...theme.typography.body2,
    color: theme.palette.text.disabled,
    marginTop: 7,
    marginBottom: 40,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 0,
    },
  },

  hashTag: {
    fontSize: "16px",
    lineHeight: "20px",
    fontFamily: "sniglet, roboto",
    color: theme.palette.secondary.main,
    marginTop: 48,
    [theme.breakpoints.down("xs")]: {
      marginTop: 24,
    },
  },

  bottomLinksContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 25,
    marginLeft: 0,
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "start",
      marginBottom: 60,
      marginLeft: 16,
    },
  },

  bottomLinks: {
    display: "flex",
    alignItems: "center",
    marginTop: 7,
    [theme.breakpoints.down("xs")]: {
      marginTop: 16,
    },
  },

  terms: {
    ...theme.typography.body2,
    marginLeft: 32,
    marginBottom: 40,
    marginRight: 0,
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 0,
      marginRight: 32,
      marginLeft: 0,
    },
  },

  footerLinks: {
    margin: 0,
    "& > p": {
      ...theme.typography.body2,
      marginTop: 24,
    },
    [theme.breakpoints.down("sm")]: {
      margin: "53px 0px 0px 0px",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "48px 0px 0px  0px",
    },
  },

  playstore: {
    height: 38,
    marginTop: 24,
  },

  madeInIndia: {
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    marginTop: "28px",
    display: "flex",
    alignItems: "center",
  },

  nesoAboutPara: {
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    maxWidth: 350,
    marginBottom: 28,
    marginTop: 28,
    marginRight: 8,
    [theme.breakpoints.down("sm")]: {
      marginTop: 24,
      marginBottom: 24,
    },
  },

  iconButton: {
    padding: "5px",
  },

  logoCicle: {
    fill: theme.palette.type === "dark" ? "white" : theme.palette.text.primary,
  },

  logoStroke: {
    fill:
      theme.palette.type === "dark"
        ? "#272727"
        : theme.palette.background.default,
    stroke:
      theme.palette.type === "dark"
        ? "#272727"
        : theme.palette.background.default,
  },

  footerIcon: {
    height: 40,
    width: 40,
  },

  flagIcon: {
    height: 10,
    marginLeft: 6,
  },

  socialMediaContainer: {
    margin: "19px 0px 0px -5px",
  },

  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    background: theme.palette.container.footer,
  },
}));

const Footer = () => {
  const classes = useStyle();
  const location = useLocation();

  const footerDescription =
    "Neso Academy offers world-class learning resources on engineering courses, school syllabus, competitive exams, and many more.";

  const bottomLinks = (
    <div className={classes.bottomLinksContainer}>
      <p className={classes.copyright}>
        {`© ${new Date().getFullYear()} Neso Academy`}
      </p>
      <div className={classes.bottomLinks}>
        <Link to="/terms-of-use" className={classes.terms}>
          Terms of use
        </Link>
        <Link to="/privacy-policy" className={classes.terms}>
          Privacy policy
        </Link>
      </div>
    </div>
  );

  return (
    <div id="footerBoundary" className={classes.root}>
      <Container>
        <div className={clsx(".footer-container-padding", "footer-container")}>
          <Grid
            container
            className={classes.gridContainer}
            spacing={20}
            style={{ marginTop: "0" }}
          >
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <SvgIcon className={classes.footerIcon} viewBox="0 0 40 40">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#footer-logo)">
                    <path
                      d="M40.0004 20.0287C39.9974 21.0178 39.9215 22.0053 39.7731 22.9832C39.6662 23.749 39.5144 24.5079 39.3186 25.2559C39.1686 25.8127 38.9958 26.3559 38.8004 26.8923C38.4968 27.7242 38.1369 28.5344 37.7231 29.3173C36.135 32.3447 33.7974 34.9145 30.9335 36.7814C28.0695 38.6483 24.7749 39.7498 21.364 39.9809C20.9095 40.0127 20.4549 40.0287 20.0004 40.0287C19.5458 40.0287 19.0913 40.0127 18.6367 39.9809C14.4839 39.7 10.5221 38.1304 7.30366 35.4909C4.08523 32.8514 1.77052 29.2735 0.682188 25.2559C0.486308 24.5079 0.334532 23.749 0.227643 22.9832C-0.180065 20.253 -0.018176 17.468 0.703118 14.8034C1.42441 12.1388 2.68949 9.65244 4.41873 7.50072C6.14797 5.349 8.30391 3.57854 10.7509 2.3008C13.1978 1.02305 15.8828 0.265692 18.6367 0.0763833C18.7617 0.0650197 18.8867 0.0582015 19.0117 0.0513834C19.339 0.0286561 19.6686 0.028656 20.0004 0.028656C20.4549 0.028656 20.9095 0.0445651 21.364 0.0763833C21.4663 0.0763833 21.5663 0.0763834 21.6663 0.0991106C26.6646 0.516902 31.3235 2.79754 34.7194 6.48891C38.1153 10.1803 40.0001 15.0129 40.0004 20.0287Z"
                      className={classes.logoCicle}
                    />
                    <path
                      d="M39.7725 22.9492C39.6656 23.714 39.5138 24.4718 39.318 25.2187H0.681596C0.485716 24.4718 0.33394 23.714 0.227051 22.9492H39.7725Z"
                      className={classes.logoStroke}
                      stroke-width="0.25"
                      stroke-miterlimit="10"
                    />
                    <path
                      d="M21.3635 0.074866V39.9228C20.909 39.9546 20.4544 39.9705 19.9999 39.9705C19.5453 39.9705 19.0908 39.9546 18.6362 39.9228V0.074866C18.7612 0.0635185 18.8862 0.0567101 19.0112 0.0499015C19.3385 0.0272065 19.668 0.0272064 19.9999 0.0272064C20.4544 0.0272064 20.909 0.043093 21.3635 0.074866Z"
                      className={classes.logoStroke}
                      stroke-width="0.25"
                      stroke-miterlimit="10"
                    />
                    <path
                      d="M38.7908 26.8527C38.4872 27.6835 38.1273 28.4925 37.7135 29.2743L35.118 25.2187L33.6658 22.9492L21.3635 3.7265L19.0112 0.0499015C19.3385 0.0272065 19.668 0.0272064 19.9999 0.0272064C20.4544 0.0272064 20.909 0.043093 21.3635 0.074866C21.4658 0.074866 21.5658 0.0748661 21.6658 0.0975611L36.293 22.9492L37.7453 25.2187L38.7908 26.8527Z"
                      className={classes.logoStroke}
                      stroke-width="0.25"
                      stroke-miterlimit="10"
                    />
                  </g>
                  <defs>
                    <clipPath id="footer-logo">
                      <rect
                        width="40"
                        height="40"
                        className={classes.logoCicle}
                      />
                    </clipPath>
                  </defs>
                </svg>
              </SvgIcon>
              <div>
                <div className={classes.hashTag}>#redefiningeducation</div>
              </div>
              {location.pathname.split("/").length > 1 ? ( //for seo
                <p data-nosnippet className={classes.nesoAboutPara}>
                  {footerDescription}
                </p>
              ) : (
                <p className={classes.nesoAboutPara}>{footerDescription}</p>
              )}
              <div variant="body2" className={classes.madeInIndia}>
                Made in India
                {/* <img className={classes.flagIcon} src={IndiaFlag} alt="" /> */}
              </div>
            </Grid>
            <Grid
              item
              lg={2}
              md={2}
              sm={3}
              xs={6}
              className={classes.footerLinks}
            >
              <Typography
                className="footer-shortlink-header"
                variant="subtitle1"
              >
                Links
              </Typography>
              <p>
                <Link to={"/about"} className="Footer-link">
                  About us
                </Link>
              </p>
              {/* <p>
                <Link to="/contact-us" className="Footer-link">
                  Contact us
                </Link>
              </p> */}
              <p>
                <Link to="/support" className="Footer-link">
                  Contact us
                </Link>
              </p>
              <p>
                <Link to="/donate" className="Footer-link">
                  Donate
                </Link>
              </p>
              <p>
                <Link to="/careers" className="Footer-link">
                  Jobs
                </Link>
              </p>
            </Grid>
            <Grid
              item
              lg={2}
              md={2}
              sm={3}
              xs={6}
              className={classes.footerLinks}
            >
              <Typography
                className="footer-shortlink-header"
                variant="subtitle1"
              >
                Courses
              </Typography>
              <p>
                <Link to="/home/Computer Science" className="Footer-link">
                  Computer Science
                </Link>
              </p>
              <p>
                <Link to="/home/Electrical" className="Footer-link">
                  Electrical
                </Link>
              </p>
              <p>
                <Link
                  to="/home/Electronics & Communication"
                  className="Footer-link"
                >
                  Electronics and Communication
                </Link>
              </p>
            </Grid>
            <Grid
              item
              lg={2}
              md={2}
              sm={3}
              xs={12}
              className={classes.footerLinks}
            >
              <Typography
                className="footer-shortlink-header"
                variant="subtitle1"
              >
                App
              </Typography>
              <a
                href="https://play.google.com/store/apps/details?id=org.nesoacademy"
                target="_blank"
                rel="noopener noreferrer"
                className="Footer-link"
              >
                <img
                  className={classes.playstore}
                  src="https://firebasestorage.googleapis.com/v0/b/neso-c53c4.appspot.com/o/ImageResource%2FWebsiteResource%2FgetItOnGooglePlay.webp?alt=media&token=11f388b4-2564-4dd5-8ee6-038feb6e92b9"
                  alt=""
                />
              </a>
            </Grid>
            <Grid
              item
              lg={2}
              md={2}
              sm={3}
              xs={12}
              className={classes.footerLinks}
            >
              <Typography
                className="footer-shortlink-header"
                variant="subtitle1"
              >
                Social
              </Typography>
              <div className={classes.socialMediaContainer}>
                {" "}
                {/* compensating the 5px padding */}
                <a
                  href="https://www.youtube.com/nesoacademy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx("Footer-link Social-link")}
                >
                  <IconButton className={classes.iconButton}>
                    <SvgIcon>
                      <YouTube />
                    </SvgIcon>
                  </IconButton>
                </a>
                <a
                  href="https://www.facebook.com/nesoacademy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx("Footer-link Social-link")}
                >
                  <IconButton className={classes.iconButton}>
                    <SvgIcon>
                      <Facebook />
                    </SvgIcon>
                  </IconButton>
                </a>
                <a
                  href="https://twitter.com/nesoacademy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx("Footer-link Social-link")}
                >
                  <IconButton className={classes.iconButton}>
                    <SvgIcon>
                      <Twitter />
                    </SvgIcon>
                  </IconButton>
                </a>
                <a
                  href="https://www.instagram.com/nesoacademy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx("Footer-link Social-link")}
                >
                  <IconButton className={classes.iconButton}>
                    <SvgIcon>
                      <Instagram />
                    </SvgIcon>
                  </IconButton>
                </a>
                <a
                  href="https://www.linkedin.com/company/nesoacademy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx("Footer-link Social-link")}
                >
                  <IconButton className={classes.iconButton}>
                    <SvgIcon>
                      <LinkedIn />
                    </SvgIcon>
                  </IconButton>
                </a>
              </div>
            </Grid>
          </Grid>
          <Hidden>
            <Grid container>
              <Grid item>{bottomLinks}</Grid>
            </Grid>
          </Hidden>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
