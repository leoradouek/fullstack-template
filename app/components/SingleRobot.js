import React from "react";
import { connect } from "react-redux";
import { fetchRobot } from "../redux/singleRobot";

class SingleRobot extends React.Component {
  componentDidMount() {
    this.props.getRobot(this.props.match.params.id);
  }

  render() {
    const robot = this.props.robot;
    const projects = this.props.projects || [];
    return (
      <div id="single-robot">
        <div>
          <img src={robot.imageUrl} />
        </div>
        <div>
          <p>{robot.name}</p>
          <p>{robot.fuelType}</p>
          <p>{robot.fuelLevel}</p>
        </div>
        <div>
          <p>Projects assigned to {robot.name}:</p>
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id}>{project.name}</div>
            ))
          ) : (
            <p>There are no projects assigned to this robot</p>
          )}
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
