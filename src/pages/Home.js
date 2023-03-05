import React from "react";
import bioImage from "../assets/me.jpeg";
import { DiBootstrap } from "react-icons/di";
import { DiCss3 } from "react-icons/di";
import { DiHtml5 } from "react-icons/di";
import { DiNodejsSmall } from "react-icons/di";
import { DiReact } from "react-icons/di";
import { DiJsBadge } from "react-icons/di";

function Home() {
  return (
    <div className="home">
    <div id="bio">
      <h1>Hi, I'm Tom</h1>
      <img src={bioImage} alt="Thomas Scott" />
      <h3>Javascript Developer</h3>
      <h5>With over 5 years experience building ... things™</h5>
      <div className="icons">
        <span className="icon js">
          <DiJsBadge />
        </span>
        <span className="icon html">
          <DiHtml5 />
        </span>
        <span className="icon css">
          <DiCss3 />
        </span>
        <span className="icon bootstrap">
          <DiBootstrap />
        </span>
        <span className="icon react">
          <DiReact />
        </span>
        <span className="icon node">
          <DiNodejsSmall />
        </span>
        </div>
        </div>
    </div>
  );
}

export default Home;
