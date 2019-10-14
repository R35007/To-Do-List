import React, { PureComponent } from "react";
import {
  Chart,
  ChartTitle,
  ChartSeries,
  ChartSeriesItem,
  ChartTooltip,
  ChartLegend,
  ChartSeriesLabels,
  ChartArea
} from "@progress/kendo-react-charts";
import "./StatusChart.scss";
import { ITask } from "src/models/task.model";
import { Status } from "src/enum/status.enum";
import ConsumerWrapper from "src/components/Context/ConsumerWrapper";

interface IProps {
  tasks: ITask[];
}

interface IState {
  data: IData[];
}

interface IData {
  name: string;
  data: number;
  color?: string;
}

class StatusChart extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentWillReceiveProps(props: IProps) {
    const { tasks } = props;
    const openCount = tasks.filter((task: ITask) => task.status === Status.OPEN).length;
    const inProgressCount = tasks.filter((task: ITask) => task.status === Status.INPROGRESS).length;
    const doneCount = tasks.filter((task: ITask) => task.status === Status.DONE).length;
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
  }

  render() {
    const { data } = this.state;
    return (
      <div className="status-chart mt-4">
        <header>Status</header>
        <Chart style={{ height: "100%" }}>
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
      </div>
    );
  }
}

export default ConsumerWrapper(StatusChart);
