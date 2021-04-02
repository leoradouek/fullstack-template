import React from "react";
import { createProject } from "../redux/projects";
import { connect } from "react-redux";

class NewProjectForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      priority: 5,
      completed: "false",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log("name", event.target.name);
    console.log("value", event.target.value);
    console.log("convert to number", Number(event.target.value));
    if (event.target.name === "priority") {
      let priorityNum = Number(event.target.value);
      this.setState({ priority: priorityNum });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }

    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.create({ ...this.state });
  }

  render() {
    const { title, description, priority } = this.state;

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

          <label htmlFor="priority">Priority Level: </label>
          <select name="priority" value={priority} onChange={this.handleChange}>
            <option>---Priority Level---</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>

          {/* <label htmlFor="priority">Priority:</label>
          <input
            name="priority"
            value={priority}
            onChange={this.handleChange}
            placeholder="Priority Level 1-10"
          /> */}

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
