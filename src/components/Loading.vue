<template>
  <div
    v-if="isLoading"
    wire:loading
    class="top-0 left-0 right-0 bottom-0 flex w-full flex-col items-center justify-center overflow-hidden bg-gray-100 opacity-75"
    :class="[noFull === false ? 'fixed z-50 h-screen' : 'absolute h-full']"
  >
    <div
      v-if="!def"
      class="loader absolute mb-4 h-20 w-20 rounded-full border-8 border-t-8 border-gray-400 ease-linear"
    ></div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  isLoading: Boolean,
  def: {
    type: Boolean,
    default: false,
  },
  noFull: Boolean,
});
</script>
