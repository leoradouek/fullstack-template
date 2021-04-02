import axios from "axios";

// action types
const SET_ROBOT = "SET_ROBOT";
// const DELETE_ASSIGNED_PROJECT = "DELETE_ASSIGNED_PROJECT";

// action creators
export const setRobot = (robot) => {
  return {
    type: SET_ROBOT,
    robot,
  };
};

// export const _deleteAssignedProject = (robot) => {
//   return {
//     type: DELETE_ASSIGNED_PROJECT,
//     robot,
//   };
// };

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

// export const deleteAssignedProject = (id) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.put(`/api/robots/${id}`);
//       dispatch(_deleteAssignedProject(data));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

// reducer
export default (state = {}, action) => {
  switch (action.type) {
    case SET_ROBOT:
      return action.robot;
    // case DELETE_ASSIGNED_PROJECT:
    //   return robot.assigned.filter((assigned) => assigned.id !== projectId);
    default:
      return state;
  }
};
