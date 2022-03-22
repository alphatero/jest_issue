<template>
  <div class="flex items-center gap-4 text-base sm:gap-8 sm:text-xl">
    <label for="first_password" class="w-16 sm:w-1/3">{{
      $t("CodeInput")
    }}</label>
    <div
      class="w-46 flex items-center rounded border"
      :class="[
        isError
          ? 'border-red-500 ring-1 ring-red-500'
          : 'border-gray-300 focus:ring-1 focus:ring-gray-400',
      ]"
    >
      <input
        type="password"
        name="first_password"
        id="first_password"
        class="w-40 rounded px-2 py-1"
        :placeholder="$t('CodeInputPlaceholder')"
        maxlength="8"
        pattern="[0-9]*"
        inputmode="numeric"
        :value="password"
        @input="$emit('update:password', ($event.target as HTMLInputElement)?.value)"
      />
      <div class="h-6 w-6 text-red-500">
        <svg
          v-if="isError"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M11
                  15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48
                  2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2
                  11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
          />
        </svg>
      </div>
    </div>
  </div>
  <div class="flex items-center gap-4 text-base sm:gap-8 sm:text-xl">
    <label for="first_password_confirm " class="w-16 sm:w-1/3">{{
      $t("CodeConfirm")
    }}</label>
    <div
      class="w-46 flex items-center rounded border"
      :class="[
        isSecondError
          ? 'border-red-500 ring-1 ring-red-500'
          : 'border-gray-300 focus:ring-1 focus:ring-gray-400',
      ]"
    >
      <input
        type="password"
        name="first_password_confirm"
        id="first_password_confirm"
        class="w-40 rounded px-2 py-1"
        :placeholder="$t('CodeConfirmPlaceholder')"
        maxlength="8"
        pattern="[0-9]*"
        inputmode="numeric"
        :value="secondPassword"
        :disabled="password === '' || isError"
        @input="$emit('update:secondPassword', ($event.target as HTMLInputElement)?.value)"
      />
      <div class="h-6 w-6 text-red-500">
        <svg
          v-if="isSecondError"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M11
                  15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48
                  2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2
                  11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps({
  password: String,
  secondPassword: String,
  isError: {
    type: Boolean,
    default: false,
  },
  isSecondError: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:password", "update:secondPassword"]);
</script>
