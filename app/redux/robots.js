import axios from "axios";

// action type
const SET_ROBOTS = "SET_ROBOTS";
const CREATE_ROBOT = "CREATE_ROBOT";
const DELETE_ROBOT = "DELETE_ROBOT";
const UPDATE_ROBOT = "UPDATE_ROBOT";

// action creator
export const setRobots = (robots) => {
  return {
    type: SET_ROBOTS,
    robots,
  };
};

export const _createRobot = (robot) => {
  return {
    type: CREATE_ROBOT,
    robot,
  };
};

export const _deleteRobot = (robot) => {
  return {
    type: DELETE_ROBOT,
    robot,
  };
};

export const _updateRobot = (robot) => {
  return {
    type: UPDATE_ROBOT,
    robot,
  };
};

// thunk creator
export const fetchRobots = () => {
  // thunk
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/robots");
      dispatch(setRobots(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const createRobot = (robot, history) => {
  return async (dispatch) => {
    const { data } = await axios.post("/api/robots", robot);
    dispatch(_createRobot(data));
    history.push("/robots");
  };
};

export const deleteRobot = (id) => {
  return async (dispatch) => {
    const { data } = await axios.delete(`/api/robots/${id}`);
    dispatch(_deleteRobot(data));
  };
};

export const updateRobot = (robot) => {
  return async (dispatch) => {
    const { data } = await axios.put(`api/robots/${robot.id}`, robot);
    dispatch(_updateRobot(data));
  };
};

// reducer
export default (state = [], action) => {
  switch (action.type) {
    case SET_ROBOTS:
      return action.robots;
    case CREATE_ROBOT:
      return [...state, action.robot];
    case DELETE_ROBOT:
      return state.filter((robot) => robot.id !== action.robot.id);
    case UPDATE_ROBOT:
      return state.map((robot) =>
        robot.id === action.robot.id ? action.robot : robot
      );
    default:
      return state;
  }
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
// export default function robotsReducer() {
//   return null;
// }
