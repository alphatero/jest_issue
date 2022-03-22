<template>
  <header
    class="z-10 flex flex-row justify-between shadow-md kemp:bg-kemp kemp:bg-opacity-70 hr:bg-highright lucent:bg-lucent lucent:bg-opacity-70 md:flex-row-reverse"
  >
    <div
      class="order-first flex h-16 w-28 justify-center bg-black md:order-last md:w-40"
    >
      <h5 class="my-auto px-2 text-xl text-white md:px-5 md:text-2xl">
        Device {{ device.number }}
      </h5>
    </div>
    <div
      class="h-16 w-1/3 justify-self-center bg-contain bg-center bg-no-repeat hr:bg-logo-highright lucent:bg-logo-lucent md:order-first md:hidden"
    >
      <span class="text-black hr:hidden lucent:hidden">
        <KempLogo />
      </span>
    </div>
    <div class="flex items-center justify-center bg-black text-white md:hidden">
      <button
        class="my-auto cursor-pointer px-5 text-2xl text-white"
        @click="mobileNav = !mobileNav"
      >
        Menu
      </button>
    </div>
  </header>
  <MobileNav :open="mobileNav" @close="mobileNav = false" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import MobileNav from "./MobileNav.vue";
import { useDevice } from "../store/monitor";
import KempLogo from "./KempLogo.vue";

const { device } = useDevice();

const mobileNav = ref(false);
</script>
