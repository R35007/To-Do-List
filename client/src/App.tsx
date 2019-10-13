import * as React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "@progress/kendo-theme-material/dist/all.css";
import "./assets/css/common-styles.scss";
import "./app.scss";
import "../../node_modules/@fortawesome/fontawesome-free/css/all.css";
import TaskList from "./components/TaskList/TaskList";

class App extends React.Component {
  public render() {
    return (
      <div className="container-fluid pane-content p-0">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
          To Do List
          </a>
        </nav>
        <main>
          <TaskList />
        </main>
      </div>
    );
  }
}

export default App;
