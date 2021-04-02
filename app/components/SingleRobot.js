import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRobot } from "../redux/singleRobot";
import ProjectsAssigned from "./ProjectsAssigned";

class SingleRobot extends React.Component {
  componentDidMount() {
    this.props.fetch(this.props.match.params.id);
  }

  render() {
    const robot = this.props.robot;
    const projects = robot.projects || [];

    return (
      <div className="single-view-container">
        <div className="single-main">
          <img src={robot.imageUrl} />
          <div id="details">
            <p>Name: {robot.name}</p>
            <p>Fuel Type: {robot.fuelType}</p>
            <p>Fuel Level: {robot.fuelLevel}</p>
            <Link to={`/robots/update/${robot.id}`}>
              <button type="button" className="update">
                Edit <i className="fa fa-edit"></i>
              </button>
            </Link>
          </div>
        </div>

        <div className="single-assigned">
          <div>
            <h1>Projects assigned to {robot.name}:</h1>
            {projects.length > 0 ? (
              projects.map((project) => (
                <ProjectsAssigned key={project.id} project={project} />
              ))
            ) : (
              <p>{robot.name} does not have any projects assigned</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    robot: state.robot,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetch: (id) => dispatch(fetchRobot(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleRobot);
