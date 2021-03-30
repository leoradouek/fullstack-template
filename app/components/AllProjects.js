import React from "react";
import { connect } from "react-redux";
import { fetchProjects } from "../redux/projects";

// Notice that we're exporting the AllProjects component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllProjects extends React.Component {
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    const projects = this.props.projects;
    return (
      <div>
        <h1>Technician Projects</h1>
        <div className="column">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="all-view">
                <div id="title">
                  <h3>{project.title}</h3>
                </div>
                <div id="details">
                  <h3>Details</h3>
                  <p>Description: {project.description}</p>
                  <p>Deadline: {project.deadline}</p>
                  <p>Priority: {project.priority}</p>
                </div>
              </div>
            ))
          ) : (
            <p> No Projects</p>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    projects: state.projects,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProjects: () => dispatch(fetchProjects()),
  };
};

export default connect(mapState, mapDispatch)(AllProjects);
