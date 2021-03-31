import axios from "axios";

// action types
const SET_PROJECT = "SET_PROJECT";

// action creators
export const setProject = (project) => {
  return {
    type: SET_PROJECT,
    project,
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

// reducer
export default (state = {}, action) => {
  switch (action.type) {
    case SET_PROJECT:
      return action.project;

    default:
      return state;
  }
};
