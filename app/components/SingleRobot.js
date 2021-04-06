import React from "react";
import { connect } from "react-redux";
import {
  fetchRobot,
  setRobot,
  deleteAssignedProject,
} from "../redux/singleRobot";
import { updateRobot } from "../redux/robots";

class SingleRobot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      fuelType: "",
      fuelLevel: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetch(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.robot.id !== this.props.robot.id) {
      this.setState({
        name: this.props.robot.name || "",
        fuelType: this.props.robot.fuelType || "",
        fuelLevel: this.props.robot.fuelLevel || "",
      });
    }
  }

  componentWillUnmount() {
    this.props.clear();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.editRobot({ ...this.props.robot, ...this.state });
  }

  handleClick(robotId, projectId) {
    this.props.removeAssignedProject(robotId, projectId);
  }

  render() {
    const robot = this.props.robot;
    const projects = robot.projects || [];
    const { name, fuelType, fuelLevel } = this.state;

    return (
      <div className="single-view-container">
        <div className="single-main">
          <img src={robot.imageUrl} />
          <div id="details">
            <p>Name: {robot.name}</p>
            <p>Fuel Type: {robot.fuelType}</p>
            <p>Fuel Level: {robot.fuelLevel}</p>
          </div>
        </div>

        <div className="single-assigned">
          <form onSubmit={this.handleSubmit}>
            <div className="form-container">
              <h1>Update Robot</h1>
              <p>Please fill out this form to edit robot:</p>

              <label htmlFor="name">Robot Name: </label>
              <input name="name" value={name} onChange={this.handleChange} />

              <label htmlFor="fuelLevel">Fuel Level: </label>
              <input
                name="fuelLevel"
                value={fuelLevel}
                onChange={this.handleChange}
              />

              <label htmlFor="fuelType">Fuel Type: </label>
              <select
                name="fuelType"
                value={fuelType}
                onChange={this.handleChange}
              >
                <option>---Fuel Type---</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="gas">Gas</option>
              </select>

              <button type="submit" className="submit">
                Save Changes
              </button>
            </div>
          </form>
          <div className="assign-bottom">
            <h1>Projects assigned to {robot.name}:</h1>
            <h4>Number of projects: {projects.length}</h4>
            <h4>List of Projects:</h4>
            {projects.length > 0 ? (
              projects.map((project) => (
                <div id="single-robot-project" key={project.id}>
                  <h3>{project.title}</h3>
                  <div id="single-details">
                    <p>Description: {project.description}</p>
                    <p>Deadline: {project.deadline}</p>
                    <p>Priority: {project.priority}</p>
                  </div>
                  <button
                    type="button"
                    className="unassign"
                    onClick={() => {
                      this.handleClick(robot.id, project.id);
                    }}
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

const mapStateToProps = (state) => {
  return {
    robot: state.robot,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    editRobot: (robot) => dispatch(updateRobot(robot, history)),
    fetch: (id) => dispatch(fetchRobot(id)),
    clear: () => dispatch(setRobot({})),
    removeAssignedProject: (robotId, projectId) =>
      dispatch(deleteAssignedProject(robotId, projectId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleRobot);
