import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProjects, deleteProject } from "../redux/projects";

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
      <div className="all-view-container">
        <div className="all-top">
          <h1>All Projects</h1>
          <Link to="/projects/add">
            <button type="button" className="add">
              Add Project <i className="fa fa-sticky-note-o"></i>
            </button>
          </Link>
        </div>
        <div className="all-bottom">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="single">
                <div>
                  <Link to={`/projects/${project.id}`} key={project.id}>
                    <h3>{project.title}</h3>
                  </Link>
                  <div className="description">
                    <p>Description:</p>
                    <p>{project.description}</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="delete"
                  onClick={() => this.props.removeProject(project.id)}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            ))
          ) : (
            <h4>There are no projects. Seems odd.</h4>
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
    removeProject: (project) => dispatch(deleteProject(project)),
  };
};

export default connect(mapState, mapDispatch)(AllProjects);
