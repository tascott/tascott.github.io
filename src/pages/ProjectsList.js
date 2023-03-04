import React from "react";
import { Link } from "react-router-dom";
import projectslist from "../projectslist.json";

function ProjectsList(props) {
  return (
    <ul>
    {Object.entries(projectslist).map(([slug, { title }]) => (
      <li key={slug}>
        <Link to={`/projects/${slug}`}>
          <h3>{title}</h3>
          </Link>
      </li>
    ))}
  </ul>
  );
}

export default ProjectsList;
