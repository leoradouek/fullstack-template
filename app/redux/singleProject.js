import axios from "axios";

// action types
const SET_PROJECT = "SET_PROJECT";
const DELETE_ASSIGNED_ROBOT = "DELETE_ASSIGNED_ROBOT";

// action creators
export const setProject = (project) => {
  return {
    type: SET_PROJECT,
    project,
  };
};

export const _deleteAssignedRobot = (robot) => {
  return {
    type: DELETE_ASSIGNED_ROBOT,
    robot,
  };
};
// thunk creators
export const fetchProject = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/projects/${id}`);
      dispatch(setProject(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteAssignedRobot = (projectId, robotId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `/api/projects/${projectId}/${robotId}`
      );
      dispatch(_deleteAssignedRobot(data));
    } catch (error) {
      console.log(error);
    }
  };
};

// reducer
export default (state = {}, action) => {
  switch (action.type) {
    case SET_PROJECT:
      return action.project;
    case DELETE_ASSIGNED_ROBOT:
      return state.robots.filter((robot) => robot.id !== action.robot.id);
    default:
      return state;
  }
};
