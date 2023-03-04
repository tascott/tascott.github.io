import React from "react";
import "./style.css";

function ProjectCard(props) {
  return (
    <div className="project" key={props.project.id}>
      <h3>{props.project.name}</h3>
      <img src={props.project.image} alt="project"></img>
      <div className="project-text">
        <h3>{props.project.description}</h3>
        <p>
          <a href={props.project.url} target="_blank" rel="noreferrer">
            Link to deployed version
          </a>
        </p>
        <p>
          <a href={props.project.repo} target="_blank" rel="noreferrer">
            Link to GitHub repo
          </a>
        </p>
      </div>
    </div>
  );
}

export default ProjectCard;
