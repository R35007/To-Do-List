import React, { Component } from "react";
import {
  Chart,
  ChartTitle,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTooltip,
  ChartSeriesLabels
} from "@progress/kendo-react-charts";
import ConsumerWrapper from "src/components/Context/ConsumerWrapper";
import { ITask } from "src/models/task.model";

interface IProps {
  tasks: ITask[];
  isViewAll: boolean;
  selectedDate: Date;
}

class TotalChart extends Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { tasks, isViewAll, selectedDate } = this.props;
    const title = isViewAll ? "Overall" : selectedDate.toDateString();
    return (
      <div className="today-chart">
        <Chart style={{ height: "120px" }}>
          <ChartTooltip />
          <ChartTitle text={title} />
          <ChartCategoryAxis>
            <ChartCategoryAxisItem categories={["Total"]} />
          </ChartCategoryAxis>
          <ChartSeries>
            <ChartSeriesItem type="bar" gap={2} spacing={0.25} data={[tasks.length]}>
              <ChartSeriesLabels background="none" content={e => e.value} />
            </ChartSeriesItem>
          </ChartSeries>
        </Chart>
      </div>
    );
  }
}

export default ConsumerWrapper(TotalChart);
