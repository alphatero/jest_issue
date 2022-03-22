<template>
  <Card :title="$t('Screw')">
    <div class="flex flex-col py-6">
      <div
        class="flex flex-col gap-4 border-b border-gray-200 p-4 text-xl text-gray-400 md:flex-row md:items-center"
      >
        <label for="totalScrew" class="w-full md:w-1/4">{{
          $t("ScrewNumber")
        }}</label>
        <div class="flex items-center gap-2 md:gap-4">
          <NumberInput
            :name="'totalScrew'"
            v-model="screw.total"
            :control="true"
            :min="0"
            :max="99"
            :step="1"
            :precision="0"
            class="w-44"
            :class="[error.screw ? 'border-red-400' : '']"
          />
          <p class="text-base md:text-xl">Pcs</p>
        </div>
      </div>

      <div class="flex flex-col p-4 text-gray-400">
        <h3 class="py-2 text-2xl">{{ $t("Count") }}{{ $t("Lock") }}</h3>
        <div class="flex flex-col gap-2 py-2">
          <div class="flex flex-col gap-2 text-xl">
            <div
              v-for="option in options"
              :key="option.value"
              class="flex items-center gap-2"
            >
              <input
                name="countLock"
                v-model="screw.countLock"
                type="radio"
                :id="option.id"
                :value="option.value"
              />
              <label :for="option.id">{{ $t(option.title) }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { defineProps, reactive } from "vue";
import NumberInput from "../numeric-input.vue";

const props = defineProps(["screw", "error", "unit"]);

const screw = reactive(props.screw);

const options = [
  {
    id: "countLockYes",
    value: "1",
    title: "Yes",
  },
  {
    id: "countLockNo",
    value: "0",
    title: "No",
  },
];
</script>
