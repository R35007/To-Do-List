import React from "react";
import { GridCell } from "@progress/kendo-react-grid";
import {
  Sparkline,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartTooltip,
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  TooltipContext,
  SharedTooltipContext
} from "@progress/kendo-react-charts";
import { convertDateNumberToTime } from "../../../assets/utils/utils";

export function DeadLineChart() {
  return class extends GridCell {
    tooltipRender = (props: TooltipContext | SharedTooltipContext) => {
      const {
        value: { target, current }
      } = (props as TooltipContext).point;
      const remaining = target - current;
      return (
        <span>
          {remaining} Days to go <br />
          Target: {target}
          <br />
          Completed: {current}
        </span>
      );
    };
    render() {
      const { dataItem } = this.props;
      const inEdit = dataItem.inEdit;
      const todayTime = convertDateNumberToTime(new Date().getTime());
      const deadLineTime = convertDateNumberToTime(dataItem.deadLineTime);
      const openOnTime = convertDateNumberToTime(dataItem.openOnTime);

      const targetDays = (deadLineTime - openOnTime) / (1000 * 3600 * 24);
      const completedDays = (todayTime - openOnTime) / (1000 * 3600 * 24);
      const remainingDays = targetDays - completedDays;
      const data = [[completedDays, targetDays]];

      const max = remainingDays < 0 ? completedDays : targetDays;
      const color = remainingDays < 0 ? "#ad0606" : "#015201";

      const humPlotBands = [
        {
          from: 0,
          to: targetDays,
          color: "#a6d27b",
          opacity: 0.6
        }
      ];
      const hidden = { visible: false };

      return (
        <td>
          {dataItem.deadLineTime && !inEdit && (
            <div style={{ marginTop: "-8px" }}>
              <Chart style={{ height: "25px" }}>
                <ChartSeries>
                  <ChartSeriesItem type="bullet" color={color} data={data} />
                </ChartSeries>
                <ChartCategoryAxis>
                  <ChartCategoryAxisItem majorGridLines={hidden} minorGridLines={hidden} />
                </ChartCategoryAxis>
                <ChartValueAxis>
                  <ChartValueAxisItem majorGridLines={hidden} visible={false} minorTicks={hidden} min={0} max={max} plotBands={humPlotBands} />
                </ChartValueAxis>
                <ChartTooltip render={this.tooltipRender} />
              </Chart>
            </div>
          )}
        </td>
      );
    }
  };
}
