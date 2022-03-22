import { Msg } from "../../types";
export function hasChart(msg: Msg) {
  return "chart" in msg;
}

let tempChart: number[] = [];
let tempLabel: number[] = [];

type Props = {
  chart: number[];
  isChartEnd: number;
};
export function Chart({ chart, isChartEnd }: Props) {
  for (let i = 0; i < chart.length; i += 1) {
    tempChart.push(chart[i] / 1000);
    tempLabel.push(i);
  }
  if (isChartEnd === 1) {
    const sendChart = tempChart;
    const sendLabel = tempLabel;
    tempChart = [];
    tempLabel = [];
    return {
      chart: sendChart,
      labels: sendLabel,
      hasChart: true,
    };
  }
}
