import React from "react";
import { Link } from "react-router-dom";

function Project(props) {
  return (
    <div className="projects-page">
      <h2>Project INDIVIDUAL page</h2>
      <div style={{ padding: 20 }}>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <Link to="/projects">Back to Projects</Link>
      </div>
    </div>
  );
}

export default Project;
