import React from "react";
import { connect } from "react-redux";
import { fetchProject } from "../redux/singleProject";

class SingleProject extends React.Component {
  componentDidMount() {
    this.props.getProject(this.props.match.params.id);
  }

  render() {
    const project = this.props.project;
    const robots = this.props.robots || [];
    console.log("PROPS", this.props);
    console.log("ROBOTS", robots);
    return (
      <div id="single-robot">
        <div>
          <h3>{project.description}</h3>
        </div>
        <div>
          <p>Title: {project.title}</p>
          <p>Deadline: {project.deadline}</p>
          <p>Priority Level: {project.priority}</p>
        </div>
        <div>
          <p>Robots assigned to this project:</p>
          {robots.length > 0 ? (
            robots.map((robot) => <div key={robot.id}>{robot.name}</div>)
          ) : (
            <p>There are no robots assigned to this project</p>
          )}
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
    getProject: (id) => dispatch(fetchProject(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProject);
