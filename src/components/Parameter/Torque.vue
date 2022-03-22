<template>
  <Card :title="$t('Torque')">
    <div class="flex flex-col py-6">
      <div
        class="flex flex-col gap-4 p-4 text-xl text-gray-400 md:flex-row md:items-center"
      >
        <label for="tarTorque" class="w-full md:w-1/4"
          >{{ $t("Target") }}{{ $t("Torque") }}</label
        >
        <div class="flex items-center gap-2 md:gap-4">
          <NumberInput
            :name="'tarTorque'"
            v-model="torque.target"
            :control="true"
            :min="0"
            :precision="torque.precision"
            :max="torque.max"
            :step="torque.step"
            class="w-44"
            :class="[error.torque ? 'border-red-400' : '']"
          />
          <p class="text-base md:text-xl">
            {{ unit.name }}
          </p>
        </div>
      </div>
      <div
        class="flex flex-col gap-4 p-4 text-xl text-gray-400 md:flex-row md:items-center"
      >
        <label for="maxTorque" class="w-full md:w-1/4"
          >{{ $t("Max") }}{{ $t("Torque") }}</label
        >
        <div class="flex items-center gap-2 md:gap-4">
          <NumberInput
            :name="'maxTorque'"
            v-model="torque.max"
            :control="true"
            :min="0"
            :precision="torque.precision"
            :max="spec.maxUpper"
            :step="torque.step"
            class="w-44"
            :class="[error.torque ? 'border-red-400' : '']"
          />
          <p class="text-base md:text-xl">
            {{ unit.name }}
          </p>
        </div>
      </div>
      <div
        class="flex flex-col gap-4 p-4 text-xl text-gray-400 md:flex-row md:items-center"
      >
        <label for="minTorque" class="w-full md:w-1/4"
          >{{ $t("Min") }}{{ $t("Torque") }}</label
        >
        <div class="flex items-center gap-2 md:gap-4">
          <NumberInput
            :name="'minTorque'"
            v-model="torque.min"
            :control="true"
            :min="0"
            :precision="torque.precision"
            :max="torque.target"
            :step="torque.step"
            class="w-44"
            :class="[error.torque ? 'border-red-400' : '']"
          />
          <p class="text-base md:text-xl">
            {{ unit.name }}
          </p>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { defineProps, reactive, onMounted } from "vue";
import NumberInput from "../numeric-input.vue";

const props = defineProps(["torque", "error", "spec", "unit"]);

const torque = reactive(props.torque);

const spec = reactive(props.spec);

onMounted(() => {
  console.log(props.torque);
});
</script>
