<template>
  <div>
    <div class="mb-12 flex justify-around text-3xl font-bold text-gray-400">
      <h3>{{ $t("Steptitle") }}</h3>
    </div>
    <div class="mb-8 flex justify-around gap-14 font-bold text-gray-400">
      <h4 class="flex-1 pr-10 text-right text-2xl">{{ $t("Slope") }}</h4>
      <h4 class="flex-1 text-2xl">{{ correction.slope }}</h4>
    </div>
    <div class="mb-14 flex justify-around gap-14 font-bold text-gray-400">
      <h4 class="flex-1 pr-10 text-right text-2xl">{{ $t("Intercept") }}</h4>
      <h4 class="flex-1 text-2xl">{{ correction.intercept }}</h4>
    </div>
    <div class="flex justify-center">
      <router-link
        class="w-24 rounded bg-gray-400 py-2 px-4 text-center font-bold text-white transition duration-300 hover:bg-gray-600 active:scale-95"
        :to="{ name: 'CorrectionStep1' }"
      >
        {{ $t("Return") }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCorrection } from "../store/Correction";

const { correction } = useCorrection();
</script>
