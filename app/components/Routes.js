import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import Components
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import AllRobots from "./AllRobots";
import AllProjects from "./AllProjects";
import SingleRobot from "./SingleRobot";
import SingleProject from "./SingleProject";
import NewRobotForm from "./NewRobotForm";
import NewProjectForm from "./NewProjectForm";
import UpdateRobotForm from "./UpdateRobotForm";

const Routes = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/robots" component={AllRobots} />
          <Route path="/robots/add" component={NewRobotForm} />
          <Route path="/robots/update/:id" component={UpdateRobotForm} />
          <Route path="/robots/:id" component={SingleRobot} />
          <Route exact path="/projects" component={AllProjects} />
          <Route path="/projects/add" component={NewProjectForm} />
          <Route path="/projects/:id" component={SingleProject} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
