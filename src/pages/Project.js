import React from "react";
import { Link, useParams } from "react-router-dom";
import projectslist from "../projectslist.json";

function Project(props) {
  const { slug } = useParams();
  const project = projectslist[slug];
  const { title, description } = project;
  return (
    <div className="projects-page">
      <div style={{ padding: 20 }}>
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to="/projects">Back to Projects</Link>
      </div>
    </div>
  );
}

export default Project;
