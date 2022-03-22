<template>
  <div class="flex h-full flex-col justify-between p-4">
    <div class="my-2 flex w-full justify-center">
      <div class="flex-1"></div>
      <div class="flex-1 text-center text-3xl font-bold">{{ current }}</div>
      <div class="flex flex-1 justify-end self-end text-lg text-gray-400">
        {{ unit }}
      </div>
    </div>
    <div class="flex w-full flex-col text-xl text-gray-400">
      <div class="flex">
        <p>{{ $t("Target") }}: {{ target }}</p>
      </div>
      <div class="mt-2 flex justify-between">
        <p>{{ $t("Max") }}: {{ max }}</p>
        <p>{{ $t("Min") }}: {{ min }}</p>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps(["current", "target", "max", "min", "unit"]);
</script>
