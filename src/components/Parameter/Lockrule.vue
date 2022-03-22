<template>
  <div class="flex flex-wrap gap-4 pt-6 pb-2">
    <div class="flex items-center gap-2">
      <input
        class=""
        type="checkbox"
        name="lockSelect_overMinTorque"
        id="lockSelect_overMaxTorque"
        :true-value="1"
        :false-value="0"
        v-model="lockRule.overMaxTorque"
        :disabled="lockRule.overMaxTorque === 2"
      />
      <label for="lockSelect_overMaxTorque">{{ $t("OverMaxTor") }}</label>
    </div>
    <div class="flex items-center gap-2">
      <input
        class=""
        type="checkbox"
        name="lockSelect_overMinTorque"
        id="lockSelect_overMinTorque"
        :true-value="1"
        :false-value="0"
        v-model="lockRule.overMinTorque"
        :disabled="lockRule.overMinTorque === 2"
      />
      <label for="lockSelect_overMinTorque">{{ $t("OverMinTor") }}</label>
    </div>
    <div class="flex items-center gap-2">
      <input
        class=""
        type="checkbox"
        name="lockSelect_overMaxTime"
        id="lockSelect_overMaxTime"
        :true-value="1"
        :false-value="0"
        v-model="lockRule.overMaxTime"
        :disabled="lockRule.overMaxTime === 2"
      />
      <label for="lockSelect_overMaxTime">{{ $t("OverMaxTime") }}</label>
    </div>
    <div class="flex items-center gap-2">
      <input
        class=""
        type="checkbox"
        name="lockSelect_overMinTime"
        id="lockSelect_overMinTime"
        :true-value="1"
        :false-value="0"
        v-model="lockRule.overMinTime"
        :disabled="lockRule.overMinTime === 2"
      />
      <label for="lockSelect_overMinTime">{{ $t("OverMinTime") }}</label>
    </div>
    <div class="flex items-center gap-2">
      <input
        class=""
        type="checkbox"
        name="lockSelect_overMaxTurns"
        id="lockSelect_overMaxTurns"
        :true-value="1"
        :false-value="0"
        v-model="lockRule.overMaxTurns"
        :disabled="lockRule.overMaxTurns === 2"
      />
      <label for="lockSelect_overMaxTurns">{{ $t("OverMaxTurns") }}</label>
    </div>
    <div class="flex items-center gap-2">
      <input
        class=""
        type="checkbox"
        name="lockSelect_overMinTurns"
        id="lockSelect_overMinTurns"
        :true-value="1"
        :false-value="0"
        v-model="lockRule.overMinTurns"
        :disabled="lockRule.overMinTurns === 2"
      />
      <label for="lockSelect_overMinTurns">{{ $t("OverMinTurns") }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, reactive } from "vue";

const props = defineProps(["lockRule"]);

const lockRule = reactive(props.lockRule);
</script>
