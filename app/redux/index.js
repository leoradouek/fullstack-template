import { combineReducers } from "redux";
import projectsReducer from "./projects";
import projectReducer from "./singleProject";
import robotsReducer from "./robots";
import robotReducer from "./singleRobot";

const appReducer = combineReducers({
  projects: projectsReducer,
  project: projectReducer,
  robots: robotsReducer,
  robot: robotReducer,
});

export default appReducer;
