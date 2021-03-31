import React from "react";
import { createProject } from "../redux/singleProject";
import { connect } from "react-redux";

class NewProjectForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
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
    const { title } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">Project Title:</label>
        <input name="title" value={title} onChange={this.handleChange} />
        <button type="submit">Add Project</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  create: (project) => dispatch(createProject(project, history)),
});

export default connect(null, mapDispatchToProps)(NewProjectForm);
