import React, { useState, useEffect } from "react";
import "./LeftContent.css";
import Content from "../Content/Content";

function LeftContent({ onItemClick, highlight, courses, parentScroll }) {


  return (
    <section className="left-content-section">
      <Content parentScroll={parentScroll} onItemClick={onItemClick} highlight={highlight} courses={courses} />
    </section>
  );
}

export default LeftContent;
