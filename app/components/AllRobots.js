import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRobots, deleteRobot } from "../redux/robots";
import Loading from "./LoadingPage";

export class AllRobots extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getRobots();
    this.setState({ loading: false });
  }

  render() {
    const robots = this.props.robots;

    return this.state.loading ? (
      <Loading />
    ) : (
      <div className="all-view-container">
        <div className="all-top">
          <h1>All Robots</h1>
          <Link to="/robots/add">
            <button type="button" className="add">
              Add Robot <i className="fa fa-user"></i>
            </button>
          </Link>
        </div>
        <div className="all-bottom">
          {robots.length > 0 ? (
            robots.map((robot) => (
              <div key={robot.id} className="single">
                <div className="description">
                  <Link to={`/robots/${robot.id}`}>
                    <img src={robot.imageUrl} />
                  </Link>
                  <h2>{robot.name}</h2>
                </div>

                <button
                  type="button"
                  className="delete"
                  onClick={() => this.props.removeRobot(robot.id)}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            ))
          ) : (
            <h4>
              There are no robot employees. Speak to HR about hiring some.
            </h4>
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
    removeRobot: (robot) => dispatch(deleteRobot(robot)),
  };
};

export default connect(mapState, mapDispatch)(AllRobots);
