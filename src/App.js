import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import TasksList from "./components/tasks-list.component"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/tasks" className="navbar-brand">
              Tasks App
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/tasks"} className="nav-link">
                  Tarefas
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/tasks"]} component={TasksList} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
