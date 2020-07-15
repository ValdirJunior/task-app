import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import TasksList from "./components/tasks-list.component"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="container mt-3">
            <Switch>
              <Route path={["/"]} component={TasksList} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
