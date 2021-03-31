import React from "react";
import { connect } from "react-redux";
import { fetchProject } from "../redux/singleProject";

class SingleProject extends React.Component {
  componentDidMount() {
    this.props.getProject(this.props.match.params.id);
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
            <p>Deadline: {project.deadline}</p>
            <p>Priority Level: {project.priority}</p>
          </div>
        </div>
        <div className="single-assigned">
          <p>Robots assigned to this project:</p>
          <div>
            {robots.length > 0 ? (
              robots.map((robot) => (
                <div key={robot.id} id="single-robot-project">
                  <img src={robot.imageUrl} />
                  <div id="single-details">
                    <p>Name: {robot.name}</p>
                    <p>Fuel Type: {robot.fuelType}</p>
                    <p>Fuel Level: {robot.fuelLevel}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>There are no robots assigned to this project!</p>
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
    getProject: (id) => dispatch(fetchProject(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProject);

// robots.map((robot) => <div key={robot.id}>{robot.name}</div>
