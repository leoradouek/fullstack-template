import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProjects, deleteProject } from "../redux/projects";
import Loading from "./LoadingPage";

export class AllProjects extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getProjects();
    this.setState({ loading: false });
  }

  render() {
    const projects = this.props.projects;

    return this.state.loading ? (
      <Loading />
    ) : (
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
                  <Link to={`/projects/${project.id}`}>
                    <h3>{project.title}</h3>
                  </Link>
                  <div className="description">
                    <p>Description: {project.description}</p>
                    <p>Priority: {Number(project.priority)}</p>
                    <p>Completed: {project.completed.toString()}</p>
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
