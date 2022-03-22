<template>
  <div
    :class="[
      'relative w-full overflow-hidden bg-gray-200',
      { 'rounded-full': rounded },
      { indeterminate: indeterminate },
      className,
    ]"
  >
    <div
      :class="[
        'progressbar h-full',
        `bg-${color}-500`,
        { 'absolute top-0': indeterminate },
        { 'rounded-full': rounded },
      ]"
      role="progressbar"
      :style="{ width: `${percentage}%` }"
      :aria-valuenow="percentage"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <span class="flex h-full items-center">
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  color: {
    type: String,
    default: "teal",
  },
  percentage: {
    type: Number,
    default: 0,
  },
  rounded: {
    type: Boolean,
    default: true,
  },
  className: String,
  indeterminate: Boolean,
});
</script>

<style scoped>
@keyframes progress-indeterminate {
  0% {
    width: 30%;
    left: -40%;
  }
  60% {
    left: 100%;
    width: 100%;
  }
  to {
    left: 100%;
    width: 0;
  }
}
.progressbar {
  transition: width 0.25s ease;
}
.indeterminate .progressbar {
  animation: progress-indeterminate 1.4s ease infinite;
}
</style>
