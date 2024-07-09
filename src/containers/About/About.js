// import React from 'react'

// const About = () => {
//   return (
//     <div>
//       About component
//     </div>
//   )
// }

// export default About

import React, { useState, useEffect } from "react";
import { Grid, useTheme } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Content from "./Content/Content";
import Analytics from "./Content/Analytics";
import Container from "@material-ui/core/Container";

import "./About.css";

const About = () => {
  const themeType = useTheme().palette.type;

  useEffect(() => {
    document.title = "About | Neso Academy"
  }, []);

  return (
    <div>
      <Container className='aboutUs'>
        <Grid container>
          <Box clone order={{ xs: 2, sm: 2, md: 1 }}>
            <Grid id='yo1' item md={8}>
              <Content check={themeType === "dark"} />
            </Grid>
          </Box>
          <Box clone order={{ xs: 1, sm: 1, md: 2 }}>
            <Grid item id='yo' md={4}>
              <Analytics check={themeType === "dark"} />
            </Grid>
          </Box>
        </Grid>
      </Container>
    </div>
  );
};

export default About;
