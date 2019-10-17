import React, { PureComponent } from "react";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartTooltip,
  ChartLegend,
  ChartSeriesLabels,
  ChartArea
} from "@progress/kendo-react-charts";
import "./StatusChart.scss";
import { ITask } from "../../../models/task.model";
import { Status } from "../../../enum/status.enum";
import { IProviderProps } from "../../../models/providerProps.model";

interface IState {
  data: IData[];
}

interface IData {
  name: string;
  data: number;
  color?: string;
}

class StatusChart extends PureComponent<IProviderProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentWillReceiveProps(props: IProviderProps) {
    const { filteredTasks } = props;
    if (filteredTasks.length > 0) {
      const openCount = filteredTasks.filter((task: ITask) => task.status === Status.OPEN).length;
      const inProgressCount = filteredTasks.filter(
        (task: ITask) => task.status === Status.INPROGRESS
      ).length;
      const doneCount = filteredTasks.filter((task: ITask) => task.status === Status.DONE).length;
      const data = [
        {
          name: `Open \n ${openCount}`,
          data: openCount
        },
        {
          name: `In Progress \n ${inProgressCount}`,
          data: inProgressCount,
          color: "rgb(255, 87, 34)"
        },
        {
          name: `Done \n ${doneCount}`,
          data: doneCount
        }
      ];
      this.setState({ data });
    } else {
      this.setState({ data: [] });
    }
  }

  donutCenterRenderer = () => {
    const { filteredTasks } = this.props;
    const totalCount = filteredTasks.length;
    const doneCount = filteredTasks.filter((task: ITask) => task.status === Status.DONE).length;

    const donePercent = ((doneCount / totalCount) * 100).toFixed(2);
    return (
      <span>
        <h3>{donePercent}%</h3> of which Done
      </span>
    );
  };

  render() {
    const { data } = this.state;
    return (
      <div className="status-chart mt-4">
        <header>Status</header>
        {data.length === 0 && <div className="no-data">No Data</div>}
        {data.length > 0 && (
          <Chart donutCenterRender={this.donutCenterRenderer} style={{ height: "100%" }}>
            <ChartTooltip />
            <ChartArea background="#eee" margin={0} />
            <ChartSeries>
              <ChartSeriesItem
                type="donut"
                data={data}
                categoryField="name"
                field="data"
                color="color"
              >
                <ChartSeriesLabels color="#fff" background="none" content={e => e.category} />
              </ChartSeriesItem>
            </ChartSeries>
            <ChartLegend visible={false} />
          </Chart>
        )}
      </div>
    );
  }
}

export default StatusChart;
