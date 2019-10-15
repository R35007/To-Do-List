import * as React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "@progress/kendo-theme-material/dist/all.css";
import "./assets/css/common-styles.scss";
import "./app.scss";
import "../../node_modules/@fortawesome/fontawesome-free/css/all.css";
import ToDoListWrapper from "./components/ToDoListWrapper/ToDoListWrapper";
import TaskChart from "./components/TaskChart/TaskChart";
import ProviderWrapper from "./components//Context/ProviderWrapper";

class App extends React.Component<any, {}> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className="container-fluid pane-content p-0">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            What To Do
          </a>
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
