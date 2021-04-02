import axios from "axios";

// action types
const SET_ROBOT = "SET_ROBOT";
const DELETE_ASSIGNED_PROJECT = "DELETE_ASSIGNED_PROJECT";

// action creators
export const setRobot = (robot) => {
  return {
    type: SET_ROBOT,
    robot,
  };
};

export const _deleteAssignedProject = (project) => {
  return {
    type: DELETE_ASSIGNED_PROJECT,
    project,
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

export const deleteAssignedProject = (robotid, projectId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `/api/robots/${robotid}/${projectId}`
      );
      dispatch(_deleteAssignedProject(data));
      console.log("delete thunk");
    } catch (error) {
      console.log(error);
    }
  };
};

// reducer

export default (state = {}, action) => {
  switch (action.type) {
    case SET_ROBOT:
      return action.robot;
    case DELETE_ASSIGNED_PROJECT:
      return state.projects.filter(
        (project) => project.id !== action.project.id
      );
    default:
      return state;
  }
};
