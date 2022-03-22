<template>
  <form
    class="grid grid-rows-3 gap-6 py-4 text-gray-400"
    @submit.prevent="sendPassword"
  >
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
          v-model="password"
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
          v-model="secondPassword"
          :disabled="password === '' || isError"
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
    <div class="mt-4 flex justify-center">
      <DarkBtn
        :disabled="
          isError ||
          isSecondError ||
          password.length === 0 ||
          secondPassword.length === 0
        "
        type="submit"
      >
        {{ $t("Confirm") }}
      </DarkBtn>
    </div>
  </form>
</template>

<script setup lang="ts">
import Service from "../websocket";
import { checkPasswordFormat, checkSecondPassword } from "../function/Setting";
import { ref, defineProps, defineEmits, watch } from "vue";

const service = Service(window.ip);

const password = ref("");

const secondPassword = ref("");

const isError = ref(false);

const isSecondError = ref(false);

const props = defineProps(["isClear"]);

const emits = defineEmits(["update:modelValue", "isClear"]);

function sendPassword() {
  const man2Password = parseInt(password.value, 10);
  const man2PasswordLength = Number(password.value.length);
  const sendPassword = JSON.stringify({ man2Password, man2PasswordLength });
  if (man2PasswordLength < 4 || isError.value || isSecondError.value) return;
  emits("update:modelValue", true);
  console.log(`sendMan1: ${sendPassword}`);
  service.send(sendPassword);
}

function clear() {
  password.value = "";
  secondPassword.value = "";
}
watch(
  () => props.isClear,
  (er) => {
    if (er) clear();
  }
);
watch(password, () => checkPasswordFormat(props.isClear, password, isError));
watch(secondPassword, () =>
  checkSecondPassword(secondPassword, password, isSecondError)
);
</script>
