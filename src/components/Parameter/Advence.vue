<template>
  <div class="flex flex-col p-4 text-gray-400">
    <h3 class="py-2 text-2xl">{{ $t("Advance") }}{{ $t("Lock") }}</h3>
    <div class="flex flex-col gap-2 py-2">
      <div class="flex flex-col gap-2 text-xl">
        <div
          v-for="option in options"
          :key="option.id"
          class="flex items-center gap-2"
        >
          <input
            name="lockSelect"
            v-model="lockRule.lockSelect"
            type="radio"
            :id="option.id"
            :value="option.value"
          />
          <label :for="option.id">{{ $t(option.title) }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, reactive } from "vue";

const props = defineProps(["lockRule"]);

const lockRule = reactive(props.lockRule);
const options = [
  {
    id: "lockSelectNone",
    value: 0,
    title: "None",
  },
  {
    id: "lockSelectIO",
    value: 1,
    title: "IOLock",
  },
  {
    id: "lockSelectScan",
    value: 2,
    title: "ScanLock",
  },
];
</script>
