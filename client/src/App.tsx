import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@progress/kendo-theme-material/dist/all.css";
import "./assets/css/common-styles.scss";
import "./app.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import ToDoListWrapper from "./components/ToDoListWrapper/ToDoListWrapper";
import TaskChart from "./components/TaskChart/TaskChart";
import ProviderWrapper from "./components//Context/ProviderWrapper";

class App extends React.Component {
  public render() {
    return (
      <div className="container-fluid pane-content p-0">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <span className="navbar-brand">What To Do</span>
        </nav>
        <main>
          <ToDoListWrapper />
          <TaskChart />
        </main>
      </div>
    );
  }
}

export default ProviderWrapper(App);
