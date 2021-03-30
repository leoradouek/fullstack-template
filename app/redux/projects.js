import axios from "axios";

// action type
const SET_PROJECTS = "SET_PROJECTS";

// action creator
export const setProjects = (projects) => {
  return {
    type: SET_PROJECTS,
    projects,
  };
};

// thunk creator
export const fetchProjects = () => {
  // thunk
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/projects");
      dispatch(setProjects(data));
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
    default:
      return state;
  }
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
// export default function projectsReducer() {
//   return null;
// }
