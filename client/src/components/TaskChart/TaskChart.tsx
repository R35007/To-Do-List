import React, { PureComponent } from "react";
import "./TaskChart.scss";
import TotalChart from "./TotalChart/TotalChart";
import StatusChart from "./StatusChart/StatusChart";

export default class TaskChart extends PureComponent<any, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="task-chart to-do-card h-100 rounded">
        <header className="d-flex align-items-center">
          <div className="col text-center">
            <span>Dashboard</span>
          </div>
        </header>
        <section className="col pt-2">
          <TotalChart />
          <StatusChart />
        </section>
      </div>
    );
  }
}
