import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRobot } from "../redux/singleRobot";

class SingleRobot extends React.Component {
  componentDidMount() {
    this.props.getRobot(this.props.match.params.id);
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
          <h4>Projects assigned to {robot.name}:</h4>
          <div>
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project.id} id="single-robot-project">
                  <h3>{project.title}</h3>
                  <div id="single-details">
                    <p>Description: {project.description}</p>
                    <p>Deadline: {project.deadline}</p>
                    <p>Priority: {project.priority}</p>
                  </div>
                  <button
                    type="button"
                    className="delete"
                    onClick={() => this.props.removeRobot(robot.id)}
                  >
                    Unassign
                  </button>
                </div>
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
    getRobot: (id) => dispatch(fetchRobot(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleRobot);
