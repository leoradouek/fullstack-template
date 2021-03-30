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
    console.log("ROBOT", robot);
    console.log("PROJECTS", projects);
    return (
      <div className="single-view">
        <div className="single-main">
          <div>
            <img src={robot.imageUrl} />
          </div>
          <div>
            <p>{robot.name}</p>
            <p>{robot.fuelType}</p>
            <p>{robot.fuelLevel}</p>
          </div>
        </div>
        <div className="assigned">
          <h2>Projects assigned to {robot.name}:</h2>
          <div id="project-container">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project.id} id="single-project">
                  <div id="title">
                    <h3>{project.title}</h3>
                  </div>
                  <div id="details">
                    <p>Details:</p>
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
