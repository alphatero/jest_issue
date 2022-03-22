<template>
  <button
    id="btn"
    :class="[
      'rounded-md px-4 py-2',
      'text-white',
      'transition-all duration-300',
      disabled
        ? [
            'lucent:bg-lucent-light ',
            ' kemp:bg-kemp-light ',
            'hr:bg-highright-light',
            'pointer-events-none',
          ]
        : [
            'lucent:bg-lucent  lucent:hover:bg-lucent-dark',
            'kemp:bg-kemp kemp:hover:bg-kemp-dark ',
            'hr:bg-highright hr:hover:bg-highright-dark',
            'active:scale-95',
          ],
    ]"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps, watch } from "vue";

const props = defineProps({
  disabled: {
    type: Boolean,
    defalut: false,
  },
  isFocus: {
    type: Boolean,
    defalut: false,
  },
});

watch(
  () => props.isFocus,
  () => {
    if (props.isFocus) {
      console.log("lish");
      const btn = document.querySelector<HTMLElement>("#btn");
      if (btn) {
        btn.focus();
      }
    }
  }
);
</script>
