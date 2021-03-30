import React from "react";
import { connect } from "react-redux";
import { fetchRobots } from "../redux/robots";

// Notice that we're exporting the AllRobots component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllRobots extends React.Component {
  componentDidMount() {
    this.props.loadRobots();
  }

  render() {
    const robots = this.props.robots;
    return (
      <div className="column">
        {robots.map((robot) => (
          <div key={robot.id} className="robot">
            <h3>{robot.name}</h3>
            <img src={robot.imageUrl} />
            <p>Fuel Type: {robot.fuelType}</p>
            <p> Fuel Level:{robot.fuelLevel}</p>
          </div>
        ))}
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
    loadRobots: () => dispatch(fetchRobots()),
  };
};

export default connect(mapState, mapDispatch)(AllRobots);
