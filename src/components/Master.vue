<template>
  <form
    ref="master"
    class="grid grid-rows-3 gap-6 py-4 text-gray-400"
    @submit.prevent="sendPassword"
  >
    <Password
      v-model:password="password"
      v-model:secondPassword="secondPassword"
      :isError="isError"
      :isSecondError="isSecondError"
    />
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
import Password from "../components/Password.vue";
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
  const masterPassword = parseInt(secondPassword.value, 10);
  const masterPasswordLength = Number(secondPassword.value.length);

  const sendPassword = JSON.stringify({
    masterPassword,
    masterPasswordLength,
  });
  if (masterPasswordLength < 4 || isError.value || isSecondError.value) return;
  emits("update:modelValue", true);
  console.log(`sendMaster:${sendPassword}`);
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
