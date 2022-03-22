<template>
  <div class="flex flex-col py-6">
    <div
      class="flex flex-col gap-4 p-4 text-xl text-gray-400 md:flex-row md:items-center"
    >
      <label for="tarTime" class="w-full md:w-1/4"
        >{{ $t("Target") }}{{ $t("Time") }}</label
      >
      <div class="flex items-center gap-2 md:gap-4">
        <NumberInput
          :name="'tarTime'"
          v-model="time.target"
          :control="true"
          :min="0"
          :precision="2"
          :max="4"
          :step="0.01"
          class="w-44"
          :class="[error.time ? 'border-red-400' : '']"
        />
        <p class="text-base md:text-xl">Sec</p>
      </div>
    </div>
    <div
      class="flex flex-col gap-4 p-4 text-xl text-gray-400 md:flex-row md:items-center"
    >
      <label for="maxTime" class="w-full md:w-1/4"
        >{{ $t("Max") }}{{ $t("Time") }}</label
      >
      <div class="flex items-center gap-2 md:gap-4">
        <NumberInput
          :name="'maxTime'"
          v-model="time.max"
          :control="true"
          :min="time.target"
          :precision="2"
          :step="0.01"
          :max="4"
          class="w-44"
          :class="[error.time ? 'border-red-400' : '']"
        />
        <p class="text-base md:text-xl">Sec</p>
      </div>
    </div>
    <div
      class="flex flex-col gap-4 p-4 text-xl text-gray-400 md:flex-row md:items-center"
    >
      <label for="minTime" class="w-full md:w-1/4"
        >{{ $t("Min") }}{{ $t("Time") }}</label
      >
      <div class="flex items-center gap-2 md:gap-4">
        <NumberInput
          :name="'minTime'"
          v-model="time.min"
          :control="true"
          :min="0"
          :precision="2"
          :step="0.01"
          :max="time.target"
          class="w-44"
          :class="[error.time ? 'border-red-400' : '']"
        />
        <p class="text-base md:text-xl">Sec</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, reactive } from "vue";
import NumberInput from "../numeric-input.vue";

const props = defineProps(["time", "error", "unit"]);

const time = reactive(props.time);
</script>
