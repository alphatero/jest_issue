<template>
  <div class="flex flex-col py-6">
    <div
      class="flex flex-col gap-4 p-4 text-xl text-gray-400 md:flex-row md:items-center"
    >
      <label for="tarTurns" class="w-full md:w-1/4"
        >{{ $t("Target") }}{{ $t("Turns") }}</label
      >
      <div class="flex items-center gap-2 md:gap-4">
        <NumberInput
          :name="'tarTurns'"
          v-model="turns.target"
          :control="true"
          :min="0"
          :precision="1"
          :step="0.1"
          :max="99"
          class="w-44"
          :class="[error.turns ? 'border-red-400' : '']"
        />
        <p class="text-base md:text-xl">Turns</p>
      </div>
    </div>
    <div
      class="flex flex-col gap-4 p-4 text-xl text-gray-400 md:flex-row md:items-center"
    >
      <label for="maxTurns" class="w-full md:w-1/4"
        >{{ $t("Max") }}{{ $t("Turns") }}</label
      >
      <div class="flex items-center gap-2 md:gap-4">
        <NumberInput
          :name="'maxTurns'"
          v-model="turns.max"
          :control="true"
          :min="0"
          :precision="1"
          :step="0.1"
          :max="99"
          class="w-44"
          :class="[error.turns ? 'border-red-400' : '']"
        />
        <p class="text-base md:text-xl">Turns</p>
      </div>
    </div>
    <div
      class="flex flex-col gap-4 p-4 text-xl text-gray-400 md:flex-row md:items-center"
    >
      <label for="minTurns" class="w-full md:w-1/4"
        >{{ $t("Min") }}{{ $t("Turns") }}</label
      >
      <div class="flex items-center gap-2 md:gap-4">
        <NumberInput
          :name="'minTurns'"
          v-model="turns.min"
          :control="true"
          :min="0"
          :precision="1"
          :step="0.1"
          :max="99"
          class="w-44"
          :class="[error.turns ? 'border-red-400' : '']"
        />
        <p class="text-base md:text-xl">Turns</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, reactive } from "vue";
import NumberInput from "../numeric-input.vue";

const props = defineProps(["turns", "error", "unit"]);

const turns = reactive(props.turns);
</script>
