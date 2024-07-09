import React from "react";
import Grid from "@material-ui/core/Grid";
import { useEffect } from 'react';
import "./Support.css";
import SupportImg from "../../assets/images/Support/Support.svg";
import Patreon from "../../assets/images/Support/Patreon.svg";
import UPI from "../../assets/images/Support/UPI.svg";
import Paypal from "../../assets/images/Support/Paypal.svg";
import UpiQR from "../../assets/images/Support/UpiQR.svg";
import Launch from "@material-ui/icons/Launch";
import Container from "@material-ui/core/Container";

const Support = () => {

  useEffect(() => {
    document.title = "Donate | Neso Academy"
  }, []);

  return (
    <Container>
      <div className='Support'>
        <Grid container>
          <Grid item sm={12} md={8}>
            <div className='supportRightCluster'>
              {/* <SvgIcon component={SupportImg} /> */}
              <img src={SupportImg} alt='' />
              <div className='supportContent'>
                <p>Support Neso Academy</p>
                <p>
                  We believe in Education for All, and we are working day & night to achieve this aim. The educational resources available on our website are of high quality, and to create more such resources, we need your support. If we have helped you in any way, help us achieve our aim. Support one-time or become our monthly supporter.
                </p>
              </div>
            </div>
          </Grid>
          <Grid className='supportLeftCluster' item sm={12} md={4}>
            <div className='supportBox'>
              <a href="https://www.patreon.com/nesoacademy" target="_blank" rel="noopener noreferrer">
                <div className='supportBoxContent'>
                  <img src={Patreon} alt='' />
                  <a href="https://www.patreon.com/nesoacademy" target="_blank" rel="noopener noreferrer">
                    <Launch />
                  </a>
                  <p className="support-mode-title" style={{ marginTop: "16px" }}>Patreon</p>
                  <p className='supportBoxBody'>
                    Patreon is a crowd-funding platform and you can support us on a
                    recurring basis by visiting our Patreon profile.
                  </p>
                </div>
              </a>
            </div>
            <div className='supportBox'>
              <a href="https://paypal.me/nesoacademyorg" target="_blank" rel="noopener noreferrer">
                <div className='supportBoxContent'>
                  <img src={Paypal} alt='' />
                  <a href="https://paypal.me/nesoacademyorg" target="_blank" rel="noopener noreferrer">
                    <Launch />

                  </a>
                  <p className="support-mode-title" style={{ marginTop: "16px" }}>
                    Paypal
                  </p>
                  <p className='supportBoxBody'>
                    Contribute one-time through PayPal and help us create more
                    useful educational resources.
                  </p>
                </div>
              </a>
            </div>
            <div className='supportBox' style={{ height: "26%" }}>
              <div className='supportBoxContent'>
                <img src={UPI} alt='' style={{ height: "32px" }} />
                {/* <div className='paytmWrapper'> */}
                {/* <div className=''> */}
                <p className="support-mode-title" style={{ marginTop: "16px" }}>UPI</p>
                <p className='supportBoxBody' style={{ width: "184px" }}>
                  If you are from India, you can use UPI for
                  one-time contribution.{" "}
                </p>
                {/* </div> */}
                {/* <div className=''> */}
                <img src={UpiQR} alt='' id='PaytmQR' />
                {/* </div> */}
                {/* </div> */}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

    </Container>
  );
};

export default Support;
