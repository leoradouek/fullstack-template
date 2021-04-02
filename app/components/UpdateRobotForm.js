import React from "react";
import { connect } from "react-redux";
import { updateRobot } from "../redux/robots";
import { fetchRobot, setRobot } from "../redux/singleRobot";

class UpdateRobotForm extends React.Component {
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
    const { id } = this.props.match.params;
    this.props.fetch(id);
    console.log("MOUNT state:", this.state);
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
    event.preventDefault();
    this.props.editRobot({ ...this.props.robot, ...this.state });
  }

  render() {
    const { robotName, fuelType, fuelLevel } = this.state;

    console.log("RENDER PROPS", this.props);

    return (
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
    );
  }
}

const mapStateToProps = ({ robot }) => ({
  robot,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  editRobot: (robot) => dispatch(updateRobot(robot, history)),
  fetch: (id) => dispatch(fetchRobot(id)),
  clear: () => dispatch(setRobot({})),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRobotForm);
