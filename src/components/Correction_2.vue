<template>
  <div class="mb:px-10 rounded-b-md bg-white">
    <div
      class="mb-8 flex items-center gap-8 text-xl text-gray-400 md:text-2xl lg:gap-20"
    >
      <h4 class="w-1/2 text-right">{{ $t("MinTorque") }}</h4>
      <h4 class="w-1/2">{{ minVoltage.minTorqueVoltage }}</h4>
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
          :precision="minVoltage.precision"
          v-model="minTorqueInput"
        >
        </NumberInput>
      </div>
    </div>
    <div class="flex justify-center text-xl text-gray-400">
      <p>point:{{ minVoltage.totalPoint }}</p>
    </div>
    <div class="mt-16 mb-8 flex justify-center gap-8">
      <button
        class="w-24 whitespace-nowrap rounded border bg-transparent py-2 px-4 font-bold transition-all duration-300 active:scale-95 kemp:border-kemp kemp:text-kemp kemp:hover:bg-kemp kemp:hover:text-white hr:border-highright hr:text-highright hr:hover:bg-highright hr:hover:text-white lucent:border-lucent lucent:text-lucent lucent:hover:bg-lucent lucent:hover:text-white"
        @click="handleReset()"
      >
        {{ $t("Reset") }}
      </button>
      <button
        @click="sendVal()"
        :class="[
          'whitespace-nowrap border bg-transparent text-white',
          'lucent:border-lucent lucent:bg-lucent lucent:hover:bg-lucent-dark',
          'kemp:border-kemp kemp:bg-kemp kemp:hover:bg-kemp-dark ',
          'hr:border-highright hr:bg-highright hr:hover:bg-highright-dark',
          'w-24 rounded py-2 px-4 font-bold',
          'transition-all duration-300 active:scale-95',
          minVoltage.totalPoint >= 10 || minTorqueInput === 0
            ? 'pointer-events-none cursor-not-allowed opacity-50'
            : '',
        ]"
      >
        {{ $t("Confirm") }}
      </button>
    </div>
    <div class="flex justify-between gap-8 border-t-2 border-gray-200 pt-10">
      <router-link
        c
        :class="[
          'bg-gray-400 transition duration-300 active:scale-95',
          'w-24 rounded py-2 px-4 text-center font-bold text-white hover:bg-gray-600',
        ]"
        :to="{ name: 'CorrectionStep1' }"
      >
        {{ $t("Back") }}
      </router-link>
      <router-link
        :class="[
          'bg-gray-400 transition duration-300 active:scale-95',
          'w-24 rounded py-2 px-4 text-center font-bold text-white hover:bg-gray-600',
          minVoltage.totalPoint > 0
            ? ''
            : 'pointer-events-none cursor-not-allowed opacity-50',
        ]"
        :to="{ name: 'CorrectionStep3' }"
      >
        {{ $t("Next") }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import NumberInput from "./numeric-input.vue";
import { useMinVoltage } from "../store/Correction";
import Service from "../websocket";
import { ref } from "vue";

// we don't need maximum range because maybe torquesensor's value larger than range

const minTorqueInput = ref(0);

const { minVoltage } = useMinVoltage();

const service = Service(window.ip);

function sendVal() {
  const sendVal = JSON.stringify({
    pointConfirm: 1,
    minTorqueInput: minTorqueInput.value * 1000,
  });
  console.log(`sendStep2:${sendVal}`);
  service.send(sendVal);
}

function handleReset() {
  const sendReset = JSON.stringify({ reset: 1 });
  console.log(`send:${sendReset}`);
  service.send(sendReset);
}
</script>
