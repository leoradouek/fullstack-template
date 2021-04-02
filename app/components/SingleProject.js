import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProject } from "../redux/singleProject";
import RobotsAssigned from "./RobotAssigned";

class SingleProject extends React.Component {
  componentDidMount() {
    this.props.fetch(this.props.match.params.id);
  }

  render() {
    const project = this.props.project;
    const robots = project.robots || [];
    return (
      <div className="single-view">
        <div className="single-main">
          <h3>{project.description}</h3>
          <div id="details">
            <p>Title: {project.title}</p>
            <p>Due on {project.deadline}</p>
            <p>Priority Level {project.priority}</p>
            <Link to={`/projects/update/${project.id}`}>
              <button type="button" className="update">
                Edit <i className="fa fa-edit"></i>
              </button>
            </Link>
          </div>
        </div>
        <div className="single-assigned">
          <h4>Robots assigned to this project:</h4>
          <div>
            {robots.length > 0 ? (
              robots.map((robot) => (
                <RobotsAssigned key={robot.id} robot={robot} />
              ))
            ) : (
              <p>There are currently no robots assigned to this project</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    project: state.project,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetch: (id) => dispatch(fetchProject(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProject);
