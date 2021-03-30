import React from "react";
import { connect } from "react-redux";

// Notice that we're exporting the AllProjects component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllProjects extends React.Component {
  render() {
    return (
      <div className="column">
        <div key="projectId" className="project">
          <h2>Project Title</h2>
          <h3>Description</h3>
          <p> Deadline</p>
          <p> Priority</p>
        </div>
      </div>
    );
  }
}

const mapState = () => {
  return {};
};

const mapDispatch = () => {
  return {};
};

export default connect(mapState, mapDispatch)(AllProjects);
