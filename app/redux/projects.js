import axios from "axios";

// action type
const SET_PROJECTS = "SET_PROJECTS";
const CREATE_PROJECT = "CREATE_PROJECT";
const DELETE_PROJECT = "DELETE_PROJECT";
const UPDATE_PROJECT = "UPDATE_PROJECT";
const MARK_COMPLETE = "MARK_COMPLETE";

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

export const _updateProject = (project) => {
  return {
    type: UPDATE_PROJECT,
    project,
  };
};

export const markComplete = (project) => {
  return {
    type: MARK_COMPLETE,
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
    try {
      const { data } = await axios.post("/api/projects", project);
      dispatch(_createProject(data));
      history.push("/projects");
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteProject = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/projects/${id}`);
      dispatch(_deleteProject(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateProject = (project, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/projects/${project.id}`, project);
      dispatch(_updateProject(data));
      history.push("/projects");
    } catch (err) {
      console.log(err);
    }
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
    case UPDATE_PROJECT:
      return state.map((project) =>
        project.id === action.project.id ? action.project : project
      );
    case MARK_COMPLETE:
      return state.map((project) =>
        project.id === action.project.id
          ? { ...action.project, completed: true }
          : project
      );

    default:
      return state;
  }
};
