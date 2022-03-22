<template>
  <Card :title="$t('LockJudge')">
    <div class="flex flex-col py-6">
      <div class="flex flex-col p-4 text-gray-400">
        <div class="flex flex-col gap-2 py-2">
          <div class="flex flex-col gap-2 text-xl">
            <div
              v-for="item in judges"
              :key="item.value"
              class="flex items-center gap-2"
            >
              <input
                name="judgeSelect"
                v-model="lockRule.judgeSelect"
                type="radio"
                :id="item.id"
                :value="item.value"
                @change="checkNgLock"
              />
              <label :for="item.id">{{ $t(item.title) }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { defineProps, reactive } from "vue";

const props = defineProps(["lockRule", "checkNgLock"]);

const judges = [
  {
    id: "judgeSelectTime",
    value: "0",
    title: "Time",
  },
  {
    id: "judgeSelectTurns",
    value: "1",
    title: "Turns",
  },
];

const lockRule = reactive(props.lockRule);
</script>
