import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRobot, setRobot } from "../redux/singleRobot";
import { updateRobot } from "../redux/robots";

import ProjectsAssigned from "./ProjectsAssigned";

class SingleRobot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      robotName: "",
      fuelType: "",
      fuelLevel: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetch(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    console.log("UPDATE state:", this.state);
    if (prevProps.robot.id !== this.props.robot.id) {
      this.setState({
        robotName: this.props.robot.name || "",
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
    console.log("handle submit");
    event.preventDefault();
    this.props.editRobot({ ...this.props.robot, ...this.state });
  }

  render() {
    const robot = this.props.robot;
    const projects = robot.projects || [];
    const { robotName, fuelType, fuelLevel } = this.state;

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
          <form onSubmit={this.handleSubmit}>
            <div className="form-container">
              <h1>Update Robot</h1>
              <p>Please fill out this form to edit robot:</p>

              <label htmlFor="robotName">Robot Name: </label>
              <input
                name="robotName"
                value={robotName}
                onChange={this.handleChange}
              />

              <label htmlFor="fuelType">Fuel Type: </label>
              <input
                name="fuelType"
                value={fuelType}
                onChange={this.handleChange}
              />

              <label htmlFor="fuelLevel">Fuel Level: </label>
              <input
                name="fuelLevel"
                value={fuelLevel}
                onChange={this.handleChange}
              />

              <button type="submit" className="submit">
                Save Changes
              </button>
            </div>
          </form>
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
    editRobot: (robot) => dispatch(updateRobot(robot, history)),
    fetch: (id) => dispatch(fetchRobot(id)),
    clear: () => dispatch(setRobot({})),
  };
};

export default connect(mapState, mapDispatch)(SingleRobot);
