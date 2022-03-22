<template>
  <div class="flex flex-col rounded-md bg-white shadow">
    <div
      :class="[
        'flex py-3 px-5',
        'kemp:bg-kemp hr:bg-highright lucent:bg-lucent',
        'rounded-t-md',
        isHome === true ? 'justify-center' : 'justify-between',
      ]"
    >
      <h5 class="text-2xl font-bold hr:text-white">
        {{ title }}
      </h5>
      <button
        v-if="isKeyin"
        class="rounded-lg border border-gray-50 py-1 px-3 text-gray-50 opacity-30 transition duration-500 ease-in-out hover:opacity-100"
        @click.prevent="$emit('openKeyout')"
      >
        {{ $t("LostPassword") }}
      </button>
      <div
        class="flex gap-3 transition duration-500 ease-in-out"
        v-if="isDataList"
      >
        <button
          :class="[
            'py-1 px-3',
            'text-white',
            'rounded-lg border border-gray-50',
            'transition duration-500 ease-in-out',
            !disabledAll ? 'opacity-100' : 'pointer-events-none opacity-30',
          ]"
          @click.prevent="$emit('openAllDelete')"
        >
          {{ $t("AllClear") }}
        </button>
        <button
          @click.prevent="$emit('openOneDelete')"
          :class="[
            'py-1 px-3',
            'text-white ',
            'rounded-lg border border-gray-50',
            'transition duration-500 ease-in-out',
            !disabled ? 'opacity-100' : 'pointer-events-none opacity-30',
          ]"
        >
          {{ $t("ClearFile") }}
        </button>
      </div>
    </div>

    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps({
  title: String,
  className: String,
  isKeyin: {
    type: Boolean,
    default: false,
  },
  isHome: Boolean,
  isDataList: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: true,
  },
  disabledAll: {
    type: Boolean,
    default: true,
  },
});

defineEmits(["openKeyout", "openOneDelete", "openAllDelete"]);
</script>
