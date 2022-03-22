/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasChart, Chart } from "../../model/view";

const chart = reactive({
  chart: [],
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasChart(msg)) {
    Object.assign(chart, Chart(msg));
  }
});

export function useChart() {
  const chartRef = ref(chart);

  watch(
    () => chart,
    (chartValue) => (chartRef.value = chartValue)
  );

  return { chart: chartRef };
}

export default chart;
