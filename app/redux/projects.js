import axios from "axios";

// action type
const SET_PROJECTS = "SET_PROJECTS";
const CREATE_PROJECT = "CREATE_PROJECT";
const DELETE_PROJECT = "DELETE_PROJECT";

// action creator
export const setProjects = (projects) => {
  return {
    type: SET_PROJECTS,
    projects,
  };
};

export const _createProject = (project) => {
  return {
    type: CREATE_PROJECT,
    project,
  };
};

export const _deleteProject = (project) => {
  return {
    type: DELETE_PROJECT,
    project,
  };
};

// thunk creators
export const fetchProjects = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/projects");
      dispatch(setProjects(data));
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

export const deleteProject = (id) => {
  return async (dispatch) => {
    const { data } = await axios.delete(`/api/projects/${id}`);
    dispatch(_deleteProject(data));
  };
};

// reducer
export default (state = [], action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return action.projects;
    case CREATE_PROJECT:
      return [...state, action.project];
    case DELETE_PROJECT:
      return state.filter((project) => project.id !== action.project.id);
    default:
      return state;
  }
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
// export default function projectsReducer() {
//   return null;
// }
