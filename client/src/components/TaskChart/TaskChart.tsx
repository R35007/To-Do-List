import React, { PureComponent } from "react";
import "./TaskChart.scss";
import TotalChart from "./TotalChart/TotalChart";
import StatusChart from "./StatusChart/StatusChart";
import ExportToExcel from "../ExportToExcel/ExportToExcel";
import ConsumerWrapper from "../Context/ConsumerWrapper";
import { IProviderProps } from "../../models/providerProps.model";

class TaskChart extends PureComponent<IProviderProps, {}> {
  render() {
    const { filteredTasks } = this.props;
    return (
      <div className="task-chart to-do-card h-100 rounded">
        <header className="d-flex align-items-center">
          <div className="col text-center">
            <span>Dashboard</span>
          </div>
          <div className="float-right">
            <ExportToExcel tasks={filteredTasks} />
          </div>
        </header>
        <section className="col pt-2">
          <TotalChart {...this.props} />
          <StatusChart {...this.props} />
        </section>
      </div>
    );
  }
}

export default ConsumerWrapper(TaskChart);
