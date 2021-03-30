import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import Components
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import AllRobots from "./AllRobots";
import AllProjects from "./AllProjects";

const Routes = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/robots" component={AllRobots} />
          <Route path="/projects" component={AllProjects} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
