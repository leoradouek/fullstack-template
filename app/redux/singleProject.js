import axios from "axios";

// action types
const SET_PROJECT = "SET_PROJECT";
const CREATE_PROJECT = "CREATE_PROJECT";

// action creators
export const setProject = (project) => {
  return {
    type: SET_PROJECT,
    project,
  };
};

export const _createProject = (project) => {
  return {
    type: CREATE_PROJECT,
    project,
  };
};
// thunk creators
export const fetchProject = (id) => {
  //thunk
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/projects/${id}`);
      dispatch(setProject(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const createProject = (project, history) => {
  return async (dispatch) => {
    const { data } = await axios.post("/api/projects", project);
    dispatch(_createProject(data));
    history.push("/projects");
  };
};

// reducer
export default (state = {}, action) => {
  switch (action.type) {
    case SET_PROJECT:
      return action.project;
    case CREATE_PROJECT:
      return { ...state, project: action.project };
    default:
      return state;
  }
};
