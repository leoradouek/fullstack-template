import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProject, setProject } from "../redux/singleProject";
import { updateProject } from "../redux/projects";
import RobotsAssigned from "./RobotsAssigned";

class SingleProject extends React.Component {
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
    this.props.fetch(this.props.match.params.id);
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
    const project = this.props.project;
    const robots = project.robots || [];
    const { title, description, priority } = this.state;

    return (
      <div className="single-view">
        <div className="single-main">
          <h3>{project.description}</h3>
          <div id="details">
            <p>Title: {project.title}</p>
            <p>Due on: {project.deadline}</p>
            <p>Priority Level: {project.priority}</p>
            <p>Completed: {project.completed}</p>
            {/* <Link to={`/projects/update/${project.id}`}>
              <button type="button" className="update">
                Edit <i className="fa fa-edit"></i>
              </button>
            </Link> */}
          </div>
        </div>
        <div className="single-assigned">
          <form onSubmit={this.handleSubmit}>
            <div className="form-container">
              <h1>Edit Project</h1>
              <p>Please fill out this form to edit project:</p>

              <label htmlFor="title">Title: </label>
              <input name="title" value={title} onChange={this.handleChange} />

              <label htmlFor="description">Description: </label>
              <input
                name="description"
                value={description}
                onChange={this.handleChange}
              />

              <label htmlFor="priority">Priority Level: </label>
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

          {/* 

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
          </form> */}
          <h4>Robots assigned to this project:</h4>
          <div>
            {robots.length > 0 ? (
              robots.map((robot) => (
                <RobotsAssigned key={robot.id} robot={robot} />
              ))
            ) : (
              <p>There are currently no robots assigned to this project</p>
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
    editProject: (project) => dispatch(updateProject(project, history)),
    fetch: (id) => dispatch(fetchProject(id)),
    clear: () => dispatch(setProject({})),
  };
};

export default connect(mapState, mapDispatch)(SingleProject);
