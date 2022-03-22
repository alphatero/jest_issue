<template>
  <!-- Desktop sidebar -->
  <aside
    class="z-20 hidden w-52 flex-shrink-0 overflow-y-auto kemp:bg-kemp kemp:bg-opacity-70 hr:bg-highright hr:bg-opacity-70 lucent:bg-lucent lucent:bg-opacity-70 md:block"
  >
    <div class="text-dark text-xl">
      <a href=""
        ><div
          class="h-16 bg-black bg-contain bg-center bg-no-repeat hr:bg-logo-highright lucent:bg-logo-lucent"
        >
          <span class="text-kemp hr:hidden lucent:hidden">
            <KempLogo class="px-2" />
          </span></div
      ></a>
      <ul class="mt-4 text-gray-500">
        <li class="relative cursor-pointer px-6 py-3">
          <router-link
            :to="{ name: 'Home' }"
            class="transition-all duration-200 hover:text-black focus:text-black hr:hover:text-black hr:focus:text-black"
            :class="[
              $route.name === 'Home' || $route.name === 'Chart'
                ? 'text-black'
                : 'text-gray-500 hr:text-gray-200',
            ]"
            >{{ $t("Dashboard") }}</router-link
          >
        </li>
        <li class="relative cursor-pointer px-6 py-3">
          <router-link
            :to="{ name: 'Correction' }"
            class="transition-all duration-200 hover:text-black focus:text-black hr:hover:text-black hr:focus:text-black"
            :class="[
              $route.path == '/correttion'
                ? 'text-black'
                : 'text-gray-500 hr:text-gray-200',
            ]"
            >{{ $t("Correction") }}</router-link
          >
        </li>
        <li class="relative cursor-pointer px-6 py-3">
          <router-link
            to="/parameter"
            class="transition-all duration-200 hover:text-black focus:text-black hr:hover:text-black hr:focus:text-black"
            :class="[
              $route.name === 'Parameter'
                ? 'text-black'
                : 'text-gray-500 hr:text-gray-200',
            ]"
            >{{ $t("Parameter") }}</router-link
          >
        </li>
        <li
          class="relative cursor-pointer px-6 py-3 hover:text-black focus:text-black"
        >
          <router-link
            to="/data"
            class="hover:text-black focus:text-black hr:hover:text-black hr:focus:text-black"
            :class="[
              $route.name === 'Data'
                ? 'text-black'
                : 'text-gray-500 hr:text-gray-200',
            ]"
            >{{ $t("Data") }}</router-link
          >
        </li>
        <li class="relative cursor-pointer px-6 py-3">
          <router-link
            to="/connection"
            class="transition-all duration-200 hover:text-black focus:text-black hr:hover:text-black hr:focus:text-black"
            :class="[
              $route.name === 'Connection'
                ? 'text-black'
                : 'text-gray-500 hr:text-gray-200',
            ]"
            >{{ $t("Connect") }}</router-link
          >
        </li>
        <li class="relative cursor-pointer px-6 py-3">
          <router-link
            to="/system"
            class="transition-all duration-200 hover:text-black focus:text-black hr:hover:text-black hr:focus:text-black"
            :class="[
              $route.name === 'System' || $route.name === 'Update'
                ? 'text-black'
                : 'text-gray-500 hr:text-gray-200',
            ]"
            >{{ $t("System") }}</router-link
          >
        </li>
        <li class="relative cursor-pointer px-6 py-3">
          <router-link
            to="/info"
            class="transition-all duration-200 hover:text-black focus:text-black hr:hover:text-black hr:focus:text-black"
            :class="[
              $route.name === 'Info'
                ? 'text-black'
                : 'text-gray-500 hr:text-gray-200',
            ]"
            >{{ $t("Info") }}</router-link
          >
        </li>
        <Auth />
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import Auth from "./Auth.vue";
import KempLogo from "./KempLogo.vue";
</script>
