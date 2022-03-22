<template>
  <div
    class="relative order-4 col-span-1 row-span-1 flex flex-col items-center rounded-md bg-white p-2 shadow lg:col-span-3 lg:row-span-4"
  >
    <Loading :isLoading="isLoading" :noFull="true" />
    <div class="chart my-2 flex w-full flex-col items-center">
      <h4 class="text-3xl">{{ $t("Chart") }}</h4>
      <Draw
        :newChartArray="newChartArray"
        :options="chartOptions"
        :labels="index"
        :width="250"
        :height="250"
        :flag="flag"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import Draw from "../components/Draw.vue";
import { hasCurrent, hasChart } from "../model/view";
import Service, { FuncType } from "../websocket";

const service = Service(window.ip);

const isLoading = ref(false);
let index = reactive<number[]>([]);
let newChartArray = ref<number[]>([]);
let tempArry = reactive<number[]>([]);
const flag = ref(false);

const chartOptions = ref({
  elements: {
    point: {
      radius: 2,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Time",
        },
      },
    ],
    yAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Torque",
        },
      },
    ],
  },
});

function handleChart() {
  const tempIndex: number[] = [];
  for (let i = 0; i < tempArry.length; i += 1) {
    tempIndex.push(i);
  }
  index = tempIndex;
  console.log(index);
  const arry = Object.values(tempArry);
  console.log("arry", arry);
  newChartArray.value = arry;
  // newChartArray.value = Object.values(newChartArray.value);
  console.log(newChartArray);
  tempArry = [];
}

onMounted(() => {
  service.addEventListener(FuncType.Msg, (e) => {
    if (hasCurrent(e)) {
      isLoading.value = true;
      newChartArray.value = [];
      console.log("old", newChartArray);
      flag.value = true;
    }
    const chartArray = [];
    if (hasChart(e)) {
      flag.value = false;
      isLoading.value = false;
      for (let i = 0; i < e.chart.length; i += 1) {
        const value = e.chart[i] / 1000;
        chartArray.push(value);
        console.log(chartArray);
      }
      if (e.isChartEnd !== undefined) {
        tempArry = tempArry.concat([...chartArray]);
        console.log(tempArry);
        if (e.isChartEnd === 1) {
          handleChart();
        }
      }
    }
  });
});
</script>
