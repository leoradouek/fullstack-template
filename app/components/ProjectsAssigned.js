import React from "react";

const ProjectsAssigned = (props) => {
  const { project } = props;

  return (
    <div id="single-robot-project">
      <h3>{project.title}</h3>
      <div id="single-details">
        <p>Description: {project.description}</p>
        <p>Deadline: {project.deadline}</p>
        <p>Priority: {project.priority}</p>
      </div>
      <button type="button" className="delete">
        Unassign
      </button>
    </div>
  );
};

export default ProjectsAssigned;
