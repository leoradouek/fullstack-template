import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import Components
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import AllRobots from "./AllRobots";
import AllProjects from "./AllProjects";
import SingleRobot from "./SingleRobot";
import SingleProject from "./SingleProject";

const Routes = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/robots" component={AllRobots} />
          <Route path="/robots/:id" component={SingleRobot} />
          <Route exact path="/projects" component={AllProjects} />
          <Route path="/projects/:id" component={SingleProject} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
