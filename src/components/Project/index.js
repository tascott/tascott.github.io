import React from "react";
import "./style.css";

function Project(props) {
  return (
    <div className="project">
      <div style={{ padding: 20 }}>
        <h3>{props.title}</h3>
        <img src={props.image} alt="project"></img>
        <div className="project-text">
          <h3>{props.description}</h3>
          <h4>{props.repo}</h4>
          <h4>{props.url}</h4>
          </div>
      </div>
    </div>
  );
}

export default Project;
