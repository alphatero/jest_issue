<template>
  <Card :title="$t('Output')">
    <div class="flex flex-col py-6">
      <div
        class="flex flex-col gap-4 border-b border-gray-200 p-4 text-xl text-gray-400 md:flex-row md:items-center"
      >
        <label for="speed" class="w-full md:w-1/4">{{ $t("Speed") }}</label>
        <div class="flex items-center gap-2 md:gap-4">
          <NumberInput
            :name="'speed'"
            v-model="speed.val"
            :control="true"
            :min="0"
            :max="1200"
            :step="1"
            :precision="0"
            class="w-44"
            :class="[error.speed ? 'border-red-400' : '']"
          />
          <p class="text-base md:text-xl">Rpm</p>
        </div>
      </div>

      <div class="flex flex-col p-4 text-gray-400">
        <h3 class="py-2 text-2xl">
          {{ $t("ReduceRpm") }}
        </h3>
        <div class="flex flex-col gap-2 py-2">
          <div class="flex flex-col gap-2 text-xl">
            <div
              v-for="option in options"
              :key="option.id"
              class="flex items-center gap-2"
            >
              <input
                name="reduceRpm"
                v-model="lockRule.reduceRpm"
                type="radio"
                :id="option.id"
                :value="option.value"
              />
              <label :for="option.id">{{ $t(option.title) }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { defineProps, reactive } from "vue";
import NumberInput from "../numeric-input.vue";

const props = defineProps(["speed", "error", "unit", "lockRule"]);

const speed = reactive(props.speed);

const lockRule = reactive(props.lockRule);

const options = [
  {
    id: "reduceRpmYes",
    value: "1",
    title: "Yes",
  },
  {
    id: "reduceRpmkNo",
    value: "0",
    title: "No",
  },
];
</script>
