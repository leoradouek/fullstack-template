import axios from "axios";

// action types
const SET_ROBOTS = "SET_ROBOTS";

// action creator
export const setRobots = (robots) => {
  return {
    type: SET_ROBOTS,
    robots,
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

// reducer
export default (state = [], action) => {
  switch (action.type) {
    case SET_ROBOTS:
      return action.robots;
    default:
      return state;
  }
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
// export default function robotsReducer() {
//   return null;
// }
