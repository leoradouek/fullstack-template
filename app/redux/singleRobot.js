import axios from "axios";

// action types
const SET_ROBOT = "SET_ROBOT";
const CREATE_ROBOT = "CREATE_ROBOT";

// action creators
export const setRobot = (robot) => {
  return {
    type: SET_ROBOT,
    robot,
  };
};

export const _createRobot = (robot) => {
  return {
    type: CREATE_ROBOT,
    robot,
  };
};

// thunk creators
export const fetchRobot = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/robots/${id}`);
      dispatch(setRobot(data));
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

// reducer
export default (state = {}, action) => {
  switch (action.type) {
    case SET_ROBOT:
      return action.robot;
    case CREATE_ROBOT:
      // return action.robot;
      return { ...state, robot: action.robot };
    default:
      return state;
  }
};
