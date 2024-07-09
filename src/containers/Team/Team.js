import React from "react";

import { Grid } from "@material-ui/core";
import Button from "../../components/UI/Buttons/Secondary/Outline1/Button";

import dummy from "./dummy.png";
import "./Team.css";
const Team = () => {
  return (
    <div className='Team'>
      <p className='teamtitle'>Our Team</p>
      <p className='teamSubTitle'>Meet Our team members</p>
      <Grid className='teamCluster' direction={"row"} spacing={10} container>
        <Grid item xs={4} sm={3} md={2}>
          <div className='teamContent'>
            <img className='memberImg' src={dummy} alt='teamimg' />
            <p className='memberName'>lorem ipsum</p>
            <p className='memberRole'>Subject Matter Expert</p>
          </div>
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <div className='teamContent'>
            <img className='memberImg' src={dummy} alt='teamimg' />
            <p className='memberName'>lorem ipsum</p>
            <p className='memberRole'>Subject Matter Expert</p>
          </div>
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <div className='teamContent'>
            <img className='memberImg' src={dummy} alt='teamimg' />
            <p className='memberName'>lorem ipsum</p>
            <p className='memberRole'>Subject Matter Expert</p>
          </div>
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <div className='teamContent'>
            <img className='memberImg' src={dummy} alt='teamimg' />
            <p className='memberName'>lorem ipsum</p>
            <p className='memberRole'>Subject Matter Expert</p>
          </div>
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <div className='teamContent'>
            <img className='memberImg' src={dummy} alt='teamimg' />
            <p className='memberName'>lorem ipsum</p>
            <p className='memberRole'>Subject Matter Expert</p>
          </div>
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <div className='teamContent'>
            <img className='memberImg' src={dummy} alt='teamimg' />
            <p className='memberName'>lorem ipsum</p>
            <p className='memberRole'>Subject Matter Expert</p>
          </div>
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <div className='teamContent'>
            <img className='memberImg' src={dummy} alt='teamimg' />
            <p className='memberName'>lorem ipsum</p>
            <p className='memberRole'>Subject Matter Expert</p>
          </div>
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <div className='teamContent'>
            <img className='memberImg' src={dummy} alt='teamimg' />
            <p className='memberName'>lorem ipsum</p>
            <p className='memberRole'>Subject Matter Expert</p>
          </div>
        </Grid>
        <Grid className='teamHire' item xs={4} sm={3} md={2}>
          <div className='Hire'>
            <div className='hireContent'>
              <p>Join Us</p>
              <p>We're hiring</p>
            </div>
          </div>
          <Button content='Apply' height='36' width='79' alignSelf='right' />
        </Grid>
      </Grid>
    </div>
  );
};

export default Team;
