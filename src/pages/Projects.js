import React from "react";
import ProjectCard from "../components/ProjectCard";
import projects from "../projects.json";

function Project() {
  console.log(projects);
  return (
    <div>
        <h2>Projects</h2>
      <h3>Project Cards</h3>
      <ProjectCard />
    </div>
  );
}

export default Project;
