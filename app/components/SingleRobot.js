import React from "react";
import { connect } from "react-redux";
import { fetchRobot } from "../redux/singleRobot";

class SingleRobot extends React.Component {
  componentDidMount() {
    this.props.getRobot(this.props.match.params.id);
  }

  render() {
    const robot = this.props.robot;
    const projects = robot.projects || [];
    return (
      <div className="single-view">
        <div className="single-main">
          <img src={robot.imageUrl} />
          <div id="details">
            <p>Name: {robot.name}</p>
            <p>Fuel Type: {robot.fuelType}</p>
            <p>Fuel Level: {robot.fuelLevel}</p>
          </div>
        </div>
        <div className="single-assigned">
          <p>Projects assigned to {robot.name}:</p>
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
                </div>
              ))
            ) : (
              <p>There are no projects assigned to this robot!</p>
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
