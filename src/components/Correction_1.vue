<template>
  <Loading :isLoading="isLoading" />
  <div>
    <div class="mb-12 flex justify-around text-3xl font-bold text-gray-400">
      <h3>{{ $t("Steptitle") }}</h3>
    </div>
    <div class="mb-8 flex justify-around gap-14 font-bold text-gray-400">
      <h4 class="flex-1 pr-10 text-right text-2xl">
        {{ $t("Slope") }}
      </h4>
      <h4 class="flex-1 text-2xl">
        {{ correction.slope }}
      </h4>
    </div>
    <div class="mb-14 flex justify-around gap-14 font-bold text-gray-400">
      <h4 class="flex-1 pr-10 text-right text-2xl">
        {{ $t("Intercept") }}
      </h4>
      <h4 class="flex-1 text-2xl">
        {{ correction.intercept }}
      </h4>
    </div>
    <div class="flex justify-center">
      <router-link
        class="w-24 rounded bg-gray-400 py-2 px-4 text-center font-bold text-white transition duration-300 hover:bg-gray-600 active:scale-95"
        :to="{ name: 'CorrectionStep2' }"
      >
        {{ $t("Next") }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import Service, { FuncType } from "../websocket";
import { useCorrection } from "../store/Correction";
import { ref, onMounted } from "vue";
import { Msg } from "../types";

const service = Service(window.ip);

const { correction } = useCorrection();

const isLoading = ref(true);

function hasCorrection(e: Msg) {
  return "slope" in e && "intercept" in e;
}

onMounted(() => {
  service.addEventListener(FuncType.Msg, (e) => {
    if (hasCorrection(e)) isLoading.value = false;
  });
});
</script>
