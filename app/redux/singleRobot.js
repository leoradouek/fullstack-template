import axios from "axios";

// action type
const SET_ROBOT = "SET_ROBOT";

// action creator
export const setRobot = (robot) => {
  return {
    type: SET_ROBOT,
    robot,
  };
};

// thunk creator
export const fetchRobot = (id) => {
  //thunk
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/robots/${id}`);
      dispatch(setRobot(data));
    } catch (err) {
      console.log(err);
    }
  };
};

// reducer
export default (state = {}, action) => {
  switch (action.type) {
    case SET_ROBOT:
      return action.robot;
    default:
      return state;
  }
};
