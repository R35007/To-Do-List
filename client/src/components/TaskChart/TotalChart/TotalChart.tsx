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
import { IProviderProps } from "src/models/providerProps.model";

class TotalChart extends Component<IProviderProps, {}> {
  constructor(props: IProviderProps) {
    super(props);
  }

  render() {
    const { filteredTasks, isViewAll, selectedDate } = this.props;
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
            <ChartSeriesItem type="bar" gap={2} spacing={0.25} data={[filteredTasks.length]}>
              <ChartSeriesLabels background="none" content={e => e.value} />
            </ChartSeriesItem>
          </ChartSeries>
        </Chart>
      </div>
    );
  }
}

export default TotalChart;
