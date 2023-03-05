import React from "react";
import { Link, useParams } from "react-router-dom";
import projectslist from "../projectslist.json";

function Project() {
  const { slug } = useParams();
  const project = projectslist[slug];
  const { title, description, image, repo, url } = project;

  return (
    <div className="project project-sole">
      <img src={image} alt="project"></img>
      <div className="project-text">
        <h3>{title}</h3>
        <p>{description}</p>
        <a className="bio-link" href={repo} target="_blank" rel="noreferrer">
          Github Repository
        </a>
        <a className="bio-link" href={url} target="_blank" rel="noreferrer">
          Live Application
        </a>
        <Link to="/projects">Back to Projects</Link>
      </div>
    </div>
  );
}

export default Project;
