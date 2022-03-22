<template>
  <div class="flex justify-center">
    <Card :title="$t('CodeSetting')" class="w-full sm:w-4/5 md:w-3/5">
      <form
        class="grid grid-rows-3 gap-6 p-4 text-gray-400"
        @submit.prevent="submitPassword()"
      >
        <Password
          v-model:password="password"
          v-model:secondPassword="secondPassword"
          :isError="isError"
          :isSecondError="isSecondError"
        />
        <div class="mt-4 flex justify-center">
          <Btn
            :disabled="
              isError ||
              isSecondError ||
              password.length === 0 ||
              secondPassword.length === 0
            "
            type="submit"
          >
            {{ $t("Confirm") }}
          </Btn>
        </div>
      </form>
    </Card>
  </div>

  <!-- Password setting finish modal -->
  <Modal
    class="py-6"
    :open="isOk"
    @close="
      isOk = false;
      $router.replace('/');
    "
  >
    <h5 class="bg-gray-100 py-6 text-center text-xl">
      {{ $t("MasterSetComplete") }}
    </h5>
    <div class="flex justify-end bg-white py-2 px-4">
      <Btn
        @click.prevent="
          $router.replace('/');
          isOk = false;
        "
      >
        {{ $t("Close") }}
      </Btn>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Service, { FuncType } from "../websocket";
import Password from "../components/Password.vue";
import { useSet } from "../store/Check";
import { ref, onMounted } from "vue";

const service = Service(window.ip);

const { set } = useSet();

const password = ref("");
const secondPassword = ref("");
const isError = ref(false);
const isSecondError = ref(false);

const isOk = ref(false);

function submitPassword() {
  const masterPasswordLength = password.value.length;
  const masterPassword = parseInt(password.value, 10);
  const sendPassword = JSON.stringify({ masterPassword, masterPasswordLength });

  if (masterPasswordLength < 4 || isError.value || isSecondError.value) return;

  console.log(`sendMaster: ${sendPassword}`);

  service.send(sendPassword);

  clear();
}

function clear() {
  password.value = "";
  secondPassword.value = "";
}

onMounted(() => {
  service.addEventListener(FuncType.Msg, (e) => {
    if ("setMasterOk" in e) {
      console.log("ok");
      set.value.setMasterOk = 0;
      isOk.value = true;
    }
  });
});
</script>
