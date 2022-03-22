<template>
  <h3 class="py-2 text-2xl">
    {{ $t("NgLock") }}
  </h3>

  <div class="flex flex-col gap-2 py-2">
    <div class="flex flex-col gap-2 text-xl">
      <div
        v-for="option in options"
        :key="option.id"
        class="flex items-center gap-2"
      >
        <input
          v-model="lockRule.ngLock"
          type="radio"
          :id="option.id"
          :value="option.value"
          @change="checkNgLock"
        />
        <label :for="option.id">{{ $t(option.title) }}</label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, reactive } from "vue";

const props = defineProps(["checkNgLock", "lockRule"]);

const lockRule = reactive(props.lockRule);

const options = [
  {
    id: "ngLockYes",
    value: "1",
    title: "Yes",
  },
  {
    id: "ngLockNo",
    value: "0",
    title: "No",
  },
];
</script>
