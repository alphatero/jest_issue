<template>
  <div
    :class="[
      'h-screen w-screen',
      'fixed left-0 top-0 z-50',
      'flex justify-start',
      'duration-400 transition-all',
      {
        'opacity-100': open,
        'pointer-events-none opacity-0': !open,
      },
    ]"
  >
    <div
      class="absolute top-0 left-0 h-full w-full bg-gray-900/60"
      @click="closeOverlay()"
    />
    <div
      class="flex w-4/5 max-w-md flex-col overflow-hidden transition-all duration-500"
      :class="{
        'z-10 animate-fadeRight': open,
        'z-0 animate-fadeLeft': !open,
      }"
    >
      <div
        class="flex h-12 flex-none border-b kemp:bg-kemp hr:bg-highright lucent:bg-lucent"
      >
        <div
          class="flex flex-1 items-center pl-4 font-bold leading-10 text-gray-600"
        >
          {{ title }}
        </div>
        <div
          class="flex h-12 w-12 flex-none scale-75 cursor-pointer items-center justify-center rounded-lg text-3xl transition-all active:scale-[.70] lucent:hover:bg-lucent-dark lucent:active:bg-lucent-dark"
          @click="closeOverlay()"
        >
          <CloseIcon class="h-12 w-12" />
        </div>
      </div>
      <div class="flex-1 bg-gray-100">
        <ul class="mobileNav text-xl">
          <li class="relative cursor-pointer px-6 py-3">
            <router-link
              @click="closeOverlay()"
              :to="{ name: 'Home' }"
              class="hover:text-black focus:text-black"
              :class="[
                $route.name === 'Home' || $route.name === 'Chart'
                  ? 'text-black'
                  : 'text-gray-500',
              ]"
              >{{ $t("Dashboard") }}</router-link
            >
          </li>
          <li class="relative cursor-pointer px-6 py-3">
            <router-link
              @click="closeOverlay()"
              :to="{ name: 'Correction' }"
              class="hover:text-black focus:text-black"
              :class="[
                $route.name === 'Correction' ||
                $route.name === 'CorrectionStep2' ||
                $route.name === 'CorrectionStep3' ||
                $route.name === 'CorrectionStep4'
                  ? 'text-black'
                  : 'text-gray-500',
              ]"
              >{{ $t("Correction") }}</router-link
            >
          </li>
          <li class="relative cursor-pointer px-6 py-3">
            <router-link
              @click="closeOverlay()"
              to="/parameter"
              class="hover:text-black focus:text-black"
              :class="[
                $route.name === 'Parameter' ? 'text-black' : 'text-gray-500',
              ]"
              >{{ $t("Parameter") }}</router-link
            >
          </li>
          <li class="relative cursor-pointer px-6 py-3">
            <router-link
              @click="closeOverlay()"
              to="/connection"
              class="hover:text-black focus:text-black"
              :class="[
                $route.name === 'Connection' ? 'text-black' : 'text-gray-500',
              ]"
              >{{ $t("Connect") }}</router-link
            >
          </li>
          <li class="relative cursor-pointer px-6 py-3">
            <router-link
              @click="closeOverlay()"
              to="/data"
              class="hover:text-black focus:text-black"
              :class="[$route.name === 'Data' ? 'text-black' : 'text-gray-500']"
              >{{ $t("Data") }}</router-link
            >
          </li>
          <li class="relative cursor-pointer px-6 py-3">
            <router-link
              @click="closeOverlay()"
              to="/system"
              class="hover:text-black focus:text-black"
              :class="[
                $route.name === 'System' ? 'text-black' : 'text-gray-500',
              ]"
              >{{ $t("System") }}</router-link
            >
          </li>
          <li
            class="relative cursor-pointer px-6 py-3 hover:text-black focus:text-black"
          >
            <router-link
              @click="closeOverlay()"
              to="/info"
              class="hover:text-black focus:text-black"
              :class="[$route.name === 'Info' ? 'text-black' : 'text-gray-500']"
              >{{ $t("Info") }}</router-link
            >
          </li>
          <Auth @close="closeOverlay" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Auth from "./Auth.vue";
import CloseIcon from "./Close_icon.vue";
import { defineProps, defineEmits } from "vue";

defineProps(["open", "title"]);

const emit = defineEmits(["close"]);

function closeOverlay() {
  emit("close");
}
</script>
