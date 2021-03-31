import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
        <h1>All Projects</h1>
        <Link to="/projects/add">
          <button>Add Project</button>
        </Link>
        <div className="column">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="all-view">
                <Link to={`/projects/${project.id}`} key={project.id}>
                  <h3>{project.title}</h3>
                  <div>
                    <p>Description:</p>
                    <p>{project.description}</p>
                  </div>
                </Link>
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
