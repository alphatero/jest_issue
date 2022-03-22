<template>
  <button
    :class="[
      'bg-gray-500 py-2 px-5 shadow',
      'rounded hover:bg-gray-600',
      'text-white',
      'transition-all duration-300 active:scale-95',
      disabled && ' pointer-events-none opacity-40',
    ]"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>
