import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRobots } from "../redux/robots";
import NewRobotForm from "./NewRobotForm";

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
        <h1>All Robots</h1>
        <Link to="/robots/add">
          <button>Add Robot</button>
        </Link>
        <div className="column">
          {robots.length > 0 ? (
            robots.map((robot) => (
              <div key={robot.id} className="all-view">
                <Link to={`/robots/${robot.id}`}>
                  <div id="image">
                    <img src={robot.imageUrl} />
                  </div>
                  <div id="details">
                    <h3>{robot.name}</h3>

                    <p>Fuel Type: {robot.fuelType}</p>
                    <p> Fuel Level: {robot.fuelLevel}</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No Robots</p>
          )}
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
