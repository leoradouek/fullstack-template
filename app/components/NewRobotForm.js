import React from "react";
import { connect } from "react-redux";
import { createRobot } from "../redux/robots";

class NewRobotForm extends React.Component {
  constructor() {
    super();
    this.state = {
      robotName: "",
      fuelType: "",
      fuelLevel: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.create({ ...this.state });
  }

  render() {
    const { robotName, fuelType, fuelLevel } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-container">
          <h1>New Robot Employee</h1>
          <p>Please fill out this form to create a new robot:</p>

          <label htmlFor="robotName">Robot Name: </label>
          <input
            name="robotName"
            value={robotName}
            onChange={this.handleChange}
            placeholder="Name"
          />

          <label htmlFor="fuelLevel">Fuel Level: </label>
          <input
            name="fuelLevel"
            min="1"
            max="100"
            value={fuelLevel}
            onChange={this.handleChange}
            placeholder="Number between 1-100"
          />

          <label htmlFor="fuelType">Fuel Type: </label>
          <select name="fuelType" value={fuelType} onChange={this.handleChange}>
            <option>---Fuel Type---</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Electric</option>
            <option value="gas">Gas</option>
          </select>

          <button type="submit" className="submit">
            Add Robot
          </button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  create: (robot) => dispatch(createRobot(robot, history)),
});

export default connect(null, mapDispatchToProps)(NewRobotForm);
