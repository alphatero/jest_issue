<template>
  <button
    class="flex-1 bg-gray-400 py-2 px-4 text-2xl text-white shadow-dark transition-colors duration-500 ease-in-out hover:bg-gray-600 active:bg-gray-600 active:shadow-none"
  >
    {{ title }}
    <slot> </slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps(["title"]);
</script>
