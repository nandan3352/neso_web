import React from "react";
import IconButton from "@material-ui/core/IconButton";
import "./Content.css";
import Logo from "../../../assets/images/Logos/Icons/NesoDarkBWIcon.svg";
import DLogo from "../../../assets/images/Logos/Icons/DarkNeso.svg";
import { ReactComponent as YouTube } from "../../../assets/images/SocialMediaIcons/YouTube.svg";
import { ReactComponent as Facebook } from "../../../assets/images/SocialMediaIcons/Facebook.svg";
import { ReactComponent as Instagram } from "../../../assets/images/SocialMediaIcons/SolidInstagram.svg";
import { ReactComponent as Twitter } from "../../../assets/images/SocialMediaIcons/Twitter.svg";
import { ReactComponent as LinkedIn } from "../../../assets/images/SocialMediaIcons/LinkedIn.svg";

import Typography from "@material-ui/core/Typography";
import { makeStyles, SvgIcon } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    padding: "5px",
  },
}));

const Content = ({ check }) => {
  const classes = useStyles();
  return (
    <div className='aboutContent'>
      <div className='imgContent'>
        {/* TODO : dont use separate images for dark and light theme, invert the color of this icon in dark mode is enough, do the same for whereever possible*/}
        {check ? (
          <img style={{ height: "40px" }} src={DLogo} alt='' />
        ) : (
          <img style={{ height: "40px" }} src={Logo} alt='' />
        )}

        <Typography variant='subtitle1'>
          Neso Academy offers world-class learning resources on engineering courses, school syllabus, competitive exams, and many more.
        </Typography>
      </div>
      <div className='contentWrapper'>
        <h2>
          "Every individual is different and talented, what you need is passion
          and curiosity."
        </h2>
        <Typography className='contentsec' variant='body2'>
          Neso Academy is an educational organization. We are committed to providing the best learning experience. Education is a fundamental human right, and it promotes individual empowerment. An educated person can differentiate between right and wrong or good and evil. It is the foremost responsibility of a society to educate its citizens. We believe in education for all, and we are redefining education from the bottom up.
        </Typography>
      </div>
      <div className='contentWrapper'>
        <h2>The Global Classroom</h2>
        <Typography className='contentsec' variant='body2'>
          Every day thousands of students visit Neso Academy and learn various
          topics from our library. They practice different problems and interact
          with teachers and other students, making Neso Academy a Global
          Classroom.
        </Typography>
      </div>
      <div className='logoWrapper'>
        <h2>Contact us</h2>
        <a style={{ cursor: 'pointer' }} href='mailto:admin@nesoacademy.org'
          target='_blank'
          rel='noopener noreferrer'>
          <Typography variant='subtitle1' >admin@nesoacademy.org</Typography>
        </a>
        <div className='aboutLogoCluster'>
          <a
            href='https://www.youtube.com/nesoacademy'
            target='_blank'
            rel='noopener noreferrer'
          >
            <IconButton className={classes.iconButton}>
              <SvgIcon>
                <YouTube />
              </SvgIcon>
            </IconButton>
          </a>
          <a
            href='https://www.facebook.com/nesoacademy/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <IconButton className={classes.iconButton}>
              <SvgIcon>
                <Facebook />
              </SvgIcon>
            </IconButton>
          </a>
          <a
            href='https://twitter.com/nesoacademy/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <IconButton className={classes.iconButton}>
              <SvgIcon>
                <Twitter />
              </SvgIcon>
            </IconButton>
          </a>
          <a
            href='https://www.instagram.com/nesoacademy/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <IconButton className={classes.iconButton}>
              <SvgIcon>
                <Instagram />
              </SvgIcon>
            </IconButton>
          </a>
          <a
            href='https://www.linkedin.com/company/nesoacademy/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <IconButton className={classes.iconButton}>
              <SvgIcon>
                <LinkedIn />
              </SvgIcon>
            </IconButton>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Content;
