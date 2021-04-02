import React from "react";
import { connect } from "react-redux";
import { updateProject } from "../redux/projects";
import { fetchProject, setProject } from "../redux/singleProject";

class UpdateProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      priority: "",
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
    if (prevProps.project.id !== this.props.project.id) {
      this.setState({
        title: this.props.project.title || "",
        description: this.props.project.description || "",
        priority: this.props.project.priority || "",
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
    this.props.editProject({ ...this.props.project, ...this.state });
  }

  render() {
    const { title, description, priority } = this.state;

    console.log("RENDER PROPS", this.props);

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-container">
          <h1>Update Project</h1>
          <p>Please fill out this form to edit project:</p>

          <label htmlFor="title">Title: </label>
          <input name="title" value={title} onChange={this.handleChange} />

          <label htmlFor="description">Description: </label>
          <input
            name="description"
            value={description}
            onChange={this.handleChange}
          />

          <label htmlFor="priority">Priority: </label>
          <input
            name="priority"
            value={priority}
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

const mapStateToProps = ({ project }) => ({
  project,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  editProject: (project) => dispatch(updateProject(project, history)),
  fetch: (id) => dispatch(fetchProject(id)),
  clear: () => dispatch(setProject({})),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProjectForm);
