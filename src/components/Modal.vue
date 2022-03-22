<template>
  <div
    :class="[
      'fixed left-0 top-0 z-40 h-screen w-screen',
      'flex justify-center',
      'transition-all duration-500',
      {
        'opacity-100': open,
        'pointer-events-none opacity-0': !open,
      },
      {
        'items-center p-3': !top,
        'items-start p-10': top,
      },
      { 'pointer-events-none': toast },
    ]"
  >
    <div
      :class="[
        'absolute top-0 left-0 h-full w-full',
        { 'pointer-events-none': noclose },
        toast === true ? 'pointer-events-none' : 'bg-gray-900/60',
      ]"
      @click="closeOverlay()"
    />
    <div
      :class="[
        'w-full max-w-md md:w-9/12',
        'flex flex-col overflow-hidden',
        'rounded-lg shadow-2xl',
        'transition-all duration-500',
        {
          'z-10 animate-fadeIn': open,
          'z-0 animate-fadeOut': !open,
        },
      ]"
    >
      <div :class="['flex h-12 flex-none border-b', className]">
        <div
          class="flex flex-1 items-center pl-4 font-bold leading-10 text-gray-600"
        >
          {{ title }}
        </div>
        <div
          :class="[
            'h-12 w-12',
            'flex flex-none items-center justify-center',
            'text-3xl',
            'scale-75 cursor-pointer rounded-lg',
            'transition-all',
            'hover:bg-gray-200 active:scale-[.70] active:bg-gray-300',
            { hidden: toast || alert },
          ]"
          @click="closeOverlay()"
        >
          <CloseIcon class="h-4 w-4" />
        </div>
      </div>
      <div class="flex-1 bg-gray-300">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import CloseIcon from "./Close_icon.vue";

defineProps({
  open: Boolean,
  title: String,
  top: Boolean,
  noclose: Boolean,
  toast: Boolean,
  className: {
    type: String,
    default: "bg-white",
  },
  alert: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

function closeOverlay() {
  emit("close");
}
</script>
