import React from "react";
import { Link } from "react-router-dom";
import projectslist from "../projectslist.json";
import Project from "../components/Project";
// import ProjectPage from "./ProjectPage";

function ProjectsList(props) {
  return (
    <div className="project-details">
      {Object.entries(projectslist).map(
        ([slug, { title, description, image, repo, url }]) => (
          <div className="project-outer" key={slug}>
            <Project
              title={title}
              description={description}
              image={image}
              repo={repo}
              url={url}
            />
            <Link to={`/projects/${slug}`}>
              <h5 className="text-center">See more</h5>
            </Link>
          </div>
        )
      )}
    </div>
  );
}

export default ProjectsList;
