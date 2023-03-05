import React from "react";
import { Outlet } from "react-router-dom";

function Projects() {
  return (
    <div className="projects-list-container">
      <h2 className="text-center page-header">Projects</h2>
      <Outlet />
    </div>
  );
}

export default Projects;
