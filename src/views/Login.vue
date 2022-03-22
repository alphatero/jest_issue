<template>
  <Loading :isLoading="isLoading" class="z-50" />
  <div class="flex justify-center">
    <Card
      :title="$t('LoginTitle')"
      class="w-full sm:w-4/5 md:w-3/5"
      :isKeyin="true"
      @openKeyout="isKeyout = true"
    >
      <form @submit.prevent="submitPassword()">
        <div class="grid items-center gap-3 p-4 text-xl md:grid-cols-3">
          <label for="password  flex-1">{{ $t("CodeInput") }}</label>
          <div class="flex justify-center">
            <div
              class="relative col-span-2 w-full flex-1 justify-center lg:max-w-[200px]"
            >
              <input
                name="password"
                id="password"
                class="w-full rounded-md px-2 py-1"
                type="password"
                v-model="passwords"
                pattern="[0-9]*"
                inputmode="numeric"
                maxlength="8"
                @change?="checkPasswordFormat"
                :class="[
                  isError
                    ? 'ring-1 ring-red-500'
                    : 'border border-gray-300 focus:ring-1 focus:ring-gray-400',
                ]"
              />
              <div
                v-if="isError"
                class="absolute top-0 right-0 mr-3 flex h-full w-6 items-center py-3 text-red-500"
              >
                <svg
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
        </div>
        <div class="grid md:grid-cols-3">
          <div class="flex items-center justify-center">
            <p v-if="password.isPass === 0" class="text-red-500">
              {{ $t("PasswordError") }}
            </p>
            <p v-if="password.isPass === 2" class="text-orange">
              {{ $t("Auth") }}
            </p>
          </div>
          <div class="flex justify-center py-4">
            <Btn type="submit" :disabled="isError || passwords.length === 0">
              {{ $t("Confirm") }}
            </Btn>
          </div>
        </div>
      </form>
    </Card>

    <!-- Lost password -->
    <Modal
      :title="$t('KeyInputTitle')"
      :open="isKeyout"
      @close="isKeyout = false"
    >
      <div class="grid grid-cols-3 gap-3 px-4 py-6">
        <input
          type="text"
          ref="keyRef1"
          v-model="key1"
          class="rounded border border-gray-300 p-1"
        />
        <input
          type="text"
          ref="keyRef2"
          v-model="key2"
          class="rounded border border-gray-300 p-1"
        />
        <input
          type="text"
          ref="keyRef3"
          v-model="key3"
          class="rounded border border-gray-300 p-1"
        />
      </div>
      <div class="flex items-center justify-end gap-3 bg-white py-2 px-4">
        <p v-if="keyStatus === 2" class="text-red-500">{{ $t("KeyError") }}</p>
        <Btn
          :disabled="
            key1.length !== 4 || key2.length !== 4 || key3.length !== 4
          "
          @click.prevent="(toConfirm = true), (keyStatus = 0)"
        >
          {{ $t("Confirm") }}
        </Btn>
      </div>
    </Modal>

    <!-- Confirm reset -->
    <Modal :open="toConfirm" @close="toConfirm = false">
      <div class="flex justify-center bg-gray-100">
        <p class="py-6 text-xl">{{ $t("CheckReset") }}</p>
      </div>
      <div class="flex justify-end bg-white py-2 px-4">
        <div class="flex gap-2">
          <button
            class="rounded-md px-3 py-2 text-white kemp:bg-kemp kemp:hover:bg-kemp-dark lucent:bg-lucent lucent:hover:bg-lucent-dark"
            @click.prevent="sendKey"
          >
            {{ $t("Yes") }}
          </button>
          <button
            class="rounded-md px-3 py-2 text-white kemp:bg-kemp kemp:hover:bg-kemp-dark hr:bg-highright hr:hover:bg-highright-dark lucent:bg-lucent lucent:hover:bg-lucent-dark"
            @click.prevent="toConfirm = false"
          >
            {{ $t("No") }}
          </button>
        </div>
      </div>
    </Modal>

    <Modal :open="overReset" @close="overReset = false">
      <div class="flex justify-center bg-gray-100 py-6">
        <p class="text-xl">{{ $t("ResetSuccess") }}</p>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import Service from "../websocket";
import { usePassword, useKey } from "../store/Login";
import { checkPasswordFormat } from "../function/Setting";
import { ref, defineEmits, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const service = Service(window.ip);
const router = useRouter();

const { password } = usePassword();
const { key } = useKey();

const toConfirm = ref(false);
const isError = ref(false);

const isLoading = ref(false);

const isKeyout = ref(false);
const overReset = ref(false);
const key1 = ref("");
const key2 = ref("");
const key3 = ref("");
const keyRef1 = ref<HTMLElement | null>(null);
const keyRef2 = ref<HTMLElement | null>(null);
const keyRef3 = ref<HTMLElement | null>(null);

const keyStatus = ref(0);
const passwords = ref("");

defineEmits(["updateAccount"]);

function submitPassword() {
  if (isError.value === false && passwords.value.length >= 4) {
    const passwordLen = passwords.value.length;
    const password = parseInt(passwords.value, 10);
    const sendPassword = JSON.stringify({ password, passwordLen });
    console.log(`sendPassword: ${sendPassword}`);
    service.send(sendPassword);
  }
}

function sendKey() {
  isLoading.value = true;
  toConfirm.value = false;
  const sendKey = JSON.stringify({ key: key1.value + key2.value + key3.value });
  console.log(`sendKey: ${sendKey}`);
  service.send(sendKey);
}

watch(
  () => password.value,
  () => {
    if (password.value.isPass === 4) {
      console.log("signup");
      router.replace("/signup");
      password.value.isPass = 0;
    }
  },
  { deep: true }
);

watch(
  () => key.value.val,
  () => {
    isLoading.value = false;
    key1.value = "";
    key2.value = "";
    key3.value = "";
    if (key.value.val === 2) {
      keyStatus.value = 2;
    } else if (key.value.val === 1) {
      isKeyout.value = false;
      overReset.value = true;
    }
    key.value.val = 0;
  }
);

watch(
  () => key1.value,
  () => {
    if (key1.value.length > 4) {
      key2.value = key1.value.substring(4);
      key1.value = key1.value.substring(0, 4);
      keyRef2.value?.focus();
    }
  }
);

watch(
  () => key2.value,
  () => {
    if (key2.value.length > 4) {
      key3.value = key2.value.substring(4);
      key2.value = key2.value.substring(0, 4);
      keyRef3.value?.focus();
    }
    if (key2.value.length === 0 && key1.value.length > 0) {
      keyRef1.value?.focus();
    }
  }
);

watch(
  () => key3.value,
  () => {
    if (key3.value.length > 4) {
      key3.value = key3.value.substr(0, 4);
    }
    if (key3.value.length === 0 && key2.value.length > 0) {
      keyRef2.value?.focus();
    }
  }
);

onMounted(() => {
  password.value.isPass = null;
});
</script>
