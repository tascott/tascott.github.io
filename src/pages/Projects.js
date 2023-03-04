import React from "react";
import ProjectCard from "../components/ProjectCard";
import projects from "../projects.json";

function Project() {
  return (
    <div className="projects-page">
      <h2>Projects</h2>
      <h3>Project Cards</h3>
      <div className="projects-container">
        {projects.map((project) => (<ProjectCard project={project} key={project.id.toString()} />))}
        </div>
    </div>
  );
}

export default Project;
