<template>
  <canvas
    ref="myChart"
    :width="width"
    :height="height"
    style="max-height: 420px"
  ></canvas>
</template>

<script setup lang="ts">
import Chart from "chart.js";
import { defineProps, ref, watch, PropType } from "vue";

const props = defineProps({
  width: {
    type: Number,
    validator: (value: Number) => value > 0,
  },

  height: {
    type: Number,
    validator: (value: Number) => value > 0,
  },

  newChartArray: {
    type: Array as PropType<number[]>,
    default: () => [],
  },

  flag: {
    type: Boolean,
    default: false,
  },

  labels: Array,
  type: {
    type: String,
    default: "line",
  },
  options: Object,
});

const chart = ref<Chart | null>(null);

const myChart = ref<HTMLCanvasElement | null>(null);

watch(
  () => props.newChartArray,
  () => {
    if (chart.value) chart.value.destroy();

    console.log(Object.values(props.newChartArray));

    if (!myChart.value) throw new Error("no chart");

    chart.value = new Chart(myChart.value, {
      type: props.type,
      data: {
        labels: [...Object.keys(props.newChartArray)],
        datasets: [
          {
            label: "Torque",
            borderColor: "blue",
            fill: false,
            data: [...Object.values(props.newChartArray)],
          },
        ],
      },
      options: props.options,
    });
    console.log(chart.value);
    chart.value.update();
  },
  { deep: true }
);
</script>
