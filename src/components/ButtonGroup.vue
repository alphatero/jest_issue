<template>
  <div class="flex justify-start items-center flex-wrap">
    <div class="flex w-full">
      <router-link
        :to="{ name: 'Home' }"
        :class="[$route.name === 'Home' ? 'text-white bg-gray-600' : 'text-gray-600']"
        class="w-full text-base rounded-r-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer border border-gray-600"
      >
        {{ $t('Result') }}
      </router-link>
      <router-link
        :class="[$route.name === 'Chart' ? 'text-white bg-gray-600' : 'text-gray-600']"
        :to="{ name: 'Chart' }"
        class="w-full text-base rounded-l-none border-l-0 flex justify-center px-4 py-2 rounded font-bold cursor-pointer border border-gray-600"
      >
        {{ $t('Chart') }}
      </router-link>
    </div>
  </div>
</template>
