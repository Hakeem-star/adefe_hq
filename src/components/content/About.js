import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./css/About.scss";

function About() {
  return (
    <div id="About_container">
      <div className="top_quote_container">
        <div className="top_curve">
          <div className="curve"></div>
        </div>
        <div className="top_quote">
          " Art challenges the use of technology, and good technology inspires
          artistry. "
        </div>
      </div>
      <div id="Hakeem">
        <div className="name_container">
          <div className="name">Hakeem Ladejobi</div>
          <div className="job_title">Co-CEO</div>
        </div>
      </div>

      <div id="about_content">
        <p id="about_content_p1">
          Led by Hakeem Ladejobi and Sam Adefe, the consultancy focuses on
          providing hands-on strategic consulting and design services.
          Specialising in brand identity, design systems, digital tools and art
          direction.
        </p>
        <p id="about_content_p2">
          Together, we're on a mission to promote creative independence,{" "}
          <span id="about_content_p2_grey">
            whilst facilitating campaigns that foster forward thinking ideas,
            direct impact within communities - and beyond.
          </span>
        </p>
      </div>

      <div className="bottom_quote_container">
        <div className="bottom_quote">
          " To design is much more than simply assembling, ordering, or editing
          components. It's about adding value and meaning, it's about
          simplicity, clarity, narrative and purpose. To design is to give
          meaning to visual poetry. "
        </div>
        <div id="Sam">
          <div className="name_container">
            <div className="name">Sam Adefe</div>
            <div className="job_title">CEO</div>
          </div>
        </div>
      </div>
      <div className="bottom_curve"></div>
    </div>
  );
}

export default About;