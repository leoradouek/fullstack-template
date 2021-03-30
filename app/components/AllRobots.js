import React from "react";
import { connect } from "react-redux";
import { fetchRobots } from "../redux/robots";

// Notice that we're exporting the AllRobots component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllRobots extends React.Component {
  componentDidMount() {
    this.props.getRobots();
  }

  render() {
    const robots = this.props.robots;
    return (
      <div>
        <h1>Robot Technicians</h1>
        <div className="column">
          {robots.map((robot) => (
            <div key={robot.id} className="all-view">
              <h3>{robot.name}</h3>
              <img src={robot.imageUrl} />
              <h3>Fuel Type</h3>
              <p>{robot.fuelType}</p>
              <h3> Fuel Level</h3>
              <p> {robot.fuelLevel}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    robots: state.robots,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getRobots: () => dispatch(fetchRobots()),
  };
};

export default connect(mapState, mapDispatch)(AllRobots);
