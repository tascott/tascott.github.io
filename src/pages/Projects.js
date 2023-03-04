import React from "react";
import { Outlet } from "react-router-dom";

function Projects() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Projects</h2>
      <Outlet />
    </div>
  );
}

export default Projects;
