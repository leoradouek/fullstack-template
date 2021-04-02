import React from "react";
import { connect } from "react-redux";
import {
  fetchProject,
  setProject,
  deleteAssignedRobot,
} from "../redux/singleProject";
import { updateProject } from "../redux/projects";

class SingleProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      priority: "",
      completed: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetch(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.project.id !== this.props.project.id) {
      this.setState({
        title: this.props.project.title || "",
        description: this.props.project.description || "",
        priority: this.props.project.priority || "",
        completed: this.props.project.completed || "",
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

  handleClick(robotId, projectId) {
    this.props.removeAssignedRobot(robotId, projectId);
  }

  render() {
    const project = this.props.project;

    const robots = project.robots || [];
    const { title, description, priority, completed } = this.state;

    return (
      <div className="single-view">
        <div className="single-main">
          <p>{project.title}</p>

          <div id="details">
            <p>Description: {project.description}</p>
            <p>Priority Level: {project.priority}</p>
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
              <select
                name="priority"
                value={priority}
                onChange={this.handleChange}
              >
                <option>---Priority Level---</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>

              {/* <label htmlFor="completed">Completed: </label>
              <select
                name="completed"
                value={completed}
                onChange={this.handleChange}
              >
                <option value="false">false</option>
                <option value="true">true</option>
              </select> */}

              <button type="submit" className="submit">
                Save Changes
              </button>
            </div>
          </form>

          <div className="assign-bottom">
            <h1>Robots assigned to this project:</h1>
            <h4>Number of robots assigned: {robots.length}</h4>
            <div>
              {robots.length > 0 ? (
                robots.map((robot) => (
                  <div id="single-robot-project" key={robot.id}>
                    <img src={robot.imageUrl} />
                    <div id="single-details">
                      <p>Name: {robot.name}</p>
                      <p>Fuel Type: {robot.fuelType}</p>
                      <p>Fuel Level: {robot.fuelLevel}</p>
                    </div>
                    <button
                      type="button"
                      className="unassign"
                      onClick={() => {
                        this.handleClick(project.id, robot.id);
                      }}
                    >
                      Unassign
                    </button>
                  </div>
                ))
              ) : (
                <p>There are currently no robots assigned to this project</p>
              )}
            </div>
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

const mapDispatch = (dispatch, { history }) => {
  return {
    editProject: (project) => dispatch(updateProject(project, history)),
    fetch: (id) => dispatch(fetchProject(id)),
    clear: () => dispatch(setProject({})),
    removeAssignedRobot: (projectId, robotId) =>
      dispatch(deleteAssignedRobot(projectId, robotId)),
  };
};

export default connect(mapState, mapDispatch)(SingleProject);
