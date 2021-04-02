import React from "react";
import { createProject } from "../redux/projects";
import { connect } from "react-redux";

class NewProjectForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
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
    const { title, description } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-container">
          <h1>New Project</h1>
          <p>Please fill out this form to create a new project:</p>

          <label htmlFor="title">Project Title:</label>
          <input
            name="title"
            value={title}
            onChange={this.handleChange}
            placeholder="Name"
          />

          <label htmlFor="description">Description:</label>
          <input
            name="description"
            value={description}
            onChange={this.handleChange}
            placeholder="Description of project"
          />

          <button type="submit" className="submit">
            Add Project
          </button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  create: (project) => dispatch(createProject(project, history)),
});

export default connect(null, mapDispatchToProps)(NewProjectForm);
