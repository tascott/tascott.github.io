import React from "react";
import "./style.css";

function Project(props) {
  return (
    <div className="project">
      <img src={props.image} alt="project"></img>
      <div className="project-text">
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <a className="bio-link" href={props.repo} target="_blank" rel="noreferrer">
          Github Repository
        </a>
        <a className="bio-link" href={props.url} target="_blank" rel="noreferrer">
          Live Application
        </a>
      </div>
    </div>
  );
}

export default Project;
