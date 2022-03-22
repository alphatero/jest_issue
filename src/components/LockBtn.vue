<template>
  <button
    class="flex w-full items-center justify-center gap-3 rounded-lg bg-red-500 py-4 text-3xl font-bold text-white shadow-solid transition-all duration-100 active:shadow-none"
    @click="openModal"
  >
    <span
      v-if="props.isLocked === 1 || props.isLocked === 2"
      class="flex w-5 items-center justify-center text-white"
    >
      <NgLockIcon />
    </span>
    <span
      v-if="props.isLocked === 3 || props.isLocked === 4"
      class="flex w-8 items-center justify-center text-white"
    >
      <IoLockIcon />
    </span>
    <span
      v-if="props.isLocked === 5 || props.isLocked === 6"
      class="flex w-8 items-center justify-center text-white"
    >
      <ScanLockIcon />
    </span>
    {{ $t("Unlock") }}
  </button>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";
import NgLockIcon from "../components/NgLock_icon.vue";
import ScanLockIcon from "../components/ScanLock_icon.vue";
import IoLockIcon from "../components/IoLock_icon.vue";

const props = defineProps({
  openModal: Function as PropType<() => void>,
  isLocked: Number,
});

const openModal = props.openModal;
</script>
