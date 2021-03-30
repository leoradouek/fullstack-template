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
          {projects.map((project) => (
            <div key={project.id} className="all-view">
              <h3>Title</h3>
              <p>{project.title}</p>
              <h3>Description</h3>
              <p>{project.description}</p>
              <h3>Deadline</h3>
              <p>{project.deadline}</p>
              <h3>Priority</h3>
              <p>{project.priority}</p>
            </div>
          ))}
        </div>
        <p> *Priority: on a scale from 1-10</p>
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
