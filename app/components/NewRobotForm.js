import React from "react";
import { createRobot } from "../redux/newRobot";
import { connect } from "react-redux";

class NewRobotForm extends React.Component {
  constructor() {
    super();
    this.state = {
      robotName: "",
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
    const { robotName } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="robotName">Robot Name:</label>
        <input
          name="robotName"
          value={robotName}
          onChange={this.handleChange}
        />
        <button type="submit">Add Robot</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  create: (robot) => dispatch(createRobot(robot)),
});

export default connect(null, mapDispatchToProps)(NewRobotForm);
