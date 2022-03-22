<template>
  <div class="mb:px-10 rounded-b-md bg-white">
    <!-- main -->
    <div
      class="mb-8 flex items-center gap-8 text-xl text-gray-400 md:text-2xl lg:gap-20"
    >
      <h4 class="w-1/2 text-right">{{ $t("MaxTorque") }}</h4>
      <h4 class="w-1/2">{{ maxVoltage.maxTorqueVoltage }}</h4>
    </div>
    <div
      class="mb-8 flex items-center gap-8 text-xl text-gray-400 md:text-2xl lg:gap-20"
    >
      <h4 class="w-1/2 text-right">{{ $t("TorqueSensoer") }}</h4>
      <div class="w-1/2">
        <NumberInput
          class="w-28"
          :max="99"
          :min="0"
          :precision="maxVoltage.precision"
          v-model="maxTorqueInput"
        >
        </NumberInput>
      </div>
    </div>
    <div class="flex justify-center text-xl text-gray-400">
      <p>point:{{ maxVoltage.curPoint }}/{{ maxVoltage.totalPoint }}</p>
    </div>

    <!-- button group -->
    <div class="mt-16 mb-8 flex justify-center gap-8">
      <button
        class="w-24 whitespace-nowrap rounded border bg-transparent py-2 px-4 font-bold transition-all duration-300 active:scale-95 kemp:border-kemp kemp:text-kemp kemp:hover:bg-kemp kemp:hover:text-white hr:border-highright hr:text-highright hr:hover:bg-highright hr:hover:text-white lucent:border-lucent lucent:text-lucent lucent:hover:bg-lucent lucent:hover:text-white"
        @click="handleReset()"
      >
        {{ $t("Reset") }}
      </button>
      <button
        class="w-24 whitespace-nowrap rounded border bg-transparent py-2 px-4 font-bold text-white transition-all duration-300 active:scale-95 kemp:border-kemp kemp:bg-kemp kemp:hover:bg-kemp-dark hr:border-highright hr:bg-highright hr:hover:bg-highright-dark lucent:border-lucent lucent:bg-lucent lucent:hover:bg-lucent-dark"
        @click="sendVal()"
        :class="[
          maxVoltage.curPoint >= maxVoltage.totalPoint || maxTorqueInput === 0
            ? 'pointer-events-none cursor-not-allowed opacity-50'
            : '',
        ]"
      >
        {{ $t("Confirm") }}
      </button>
    </div>
    <div class="flex justify-between gap-8 border-t-2 border-gray-200 pt-10">
      <router-link
        class="w-24 rounded bg-gray-400 py-2 px-4 text-center font-bold text-white transition duration-300 hover:bg-gray-600 active:scale-95"
        :to="{ name: 'CorrectionStep2' }"
      >
        {{ $t("Back") }}
      </router-link>
      <router-link
        class="w-24 rounded bg-gray-400 py-2 px-4 text-center font-bold text-white transition duration-300 hover:bg-gray-600 active:scale-95"
        :class="[
          maxVoltage.curPoint === maxVoltage.totalPoint
            ? ''
            : 'pointer-events-none cursor-not-allowed opacity-50',
        ]"
        :to="{ name: 'CorrectionStep4' }"
      >
        {{ $t("Next") }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import NumberInput from "./numeric-input.vue";
import Service from "../websocket";
import { useMaxVoltage } from "../store/Correction";
import { ref } from "vue";

const { maxVoltage } = useMaxVoltage();

const maxTorqueInput = ref(0);

const service = Service(window.ip);

function sendVal() {
  const sendVal = JSON.stringify({
    pointConfirm: 1,
    maxTorqueInput: maxTorqueInput.value * 1000,
  });
  console.log(`sendStep3:${sendVal}`);
  service.send(sendVal);
}

function handleReset() {
  const sendReset = JSON.stringify({ reset: 1 });
  console.log(`send:${sendReset}`);
  service.send(sendReset);
}
</script>
