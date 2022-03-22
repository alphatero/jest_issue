<template>
  <div class="flex">
    <input
      ref="dom"
      type="text"
      class="h-full w-full rounded-md border border-gray-300 p-1 text-center md:w-20"
      :key="index"
      :value="modelValue"
      maxlength="3"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <label v-if="index !== 4" class="self-end">.</label>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, defineExpose } from "vue";

const dom = ref<HTMLElement | null>(null);

defineProps({
  index: Number,
  modelValue: String,
});

defineEmits(["update:modelValue"]);
defineExpose({ dom });
</script>
