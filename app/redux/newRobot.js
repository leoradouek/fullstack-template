import axios from "axios";

//action type
const CREATE_ROBOT = "CREATE_ROBOT";

//action creator
export const _createRobot = (robot) => {
  return {
    type: CREATE_ROBOT,
    robot,
  };
};

//thunk creator
export const createRobot = (robot) => {
  // thunk
  return async (dispatch) => {
    const { data } = await axios.post("/api/robots", robot);
    dispatch(_createRobot(data));
  };
};

// reducer
export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_ROBOT:
      return action.robot;
    // return { ...state, robot: action.robot };
    default:
      return state;
  }
};
