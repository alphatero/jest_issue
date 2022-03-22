<template>
  <Card :title="$t('Torque') + $t('Offset')">
    <div class="flex flex-col py-6">
      <div
        class="flex flex-col gap-4 p-4 text-xl text-gray-400 md:flex-row md:items-center"
      >
        <label for="speed" class="w-full md:w-1/4">{{
          $t("Torque") + $t("Offset")
        }}</label>
        <div class="flex items-center gap-2 md:gap-4">
          <NumberInput
            :name="'offset'"
            v-model="offset.val"
            :control="true"
            :min="-(spec.max / 10)"
            :precision="torque.precision"
            :max="spec.max / 10"
            :step="torque.step"
            isNegtive
            class="w-44"
            :class="[error.offset ? 'border-red-400' : '']"
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
import { defineProps, reactive } from "vue";
import NumberInput from "../numeric-input.vue";

const props = defineProps(["offset", "spec", "error", "unit", "torque"]);

const offset = reactive(props.offset);
</script>
