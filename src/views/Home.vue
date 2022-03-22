<template>
  <Loading :isLoading="state.isLoading" />
  <div v-if="state.isLocked !== 0" class="mb-4 flex">
    <LockBtn :openModal="openModal" :isLocked="state.isLocked" />
  </div>
  <div class="mb-8 grid grid-flow-row grid-cols-1 gap-4 lg:grid-cols-4">
    <!-- Torque -->
    <Card
      class="text-center md:row-span-2 lg:order-1"
      isHome
      :title="$t('Torque')"
    >
      <DataView
        :current="current.torque"
        :target="torque.target"
        :max="torque.max"
        :min="torque.min"
        :unit="unit.name"
      />
    </Card>

    <!-- Time -->
    <Card
      class="text-center lg:order-2 lg:row-span-2"
      isHome
      :title="$t('Time')"
    >
      <DataView
        :current="current.time"
        :target="time.target"
        :max="time.max"
        :min="time.min"
        :unit="'sec'"
      />
    </Card>

    <!-- Turns -->
    <Card
      class="text-center lg:order-3 lg:row-span-2"
      isHome
      :title="$t('Turns')"
    >
      <DataView
        :current="current.turns"
        :target="turns.target"
        :max="turns.max"
        :min="turns.min"
        :unit="'turns'"
      />
    </Card>

    <!-- Link -->
    <ButtonGroup class="order-first lg:order-4" />

    <!-- Result -->
    <Card
      isHome
      class="text-center lg:order-5 lg:row-span-2"
      :title="$t('Result')"
      :class="[
        $route.name === 'Chart' ? 'lg:col-span-1' : 'lg:col-span-3',
        { 'bg-white': result.result === 0 },
        { 'bg-green-500': result.result === 1 },
        { 'bg-red-500': result.result === 2 },
        { 'bg-orange': result.result === 3 },
        { 'bg-pink-600': result.result === 4 },
      ]"
    >
      <div
        class="flex flex-1 items-center justify-center rounded-b-md p-10 text-7xl text-white"
      >
        <h4 v-if="result.result === 1">OK</h4>
        <h4 v-else-if="result.result === 2">NG</h4>
        <h4 v-else-if="result.result === 3">
          {{ $t("Floating") }}
        </h4>
        <h4 v-else-if="result.result === 4">
          {{ $t("Strip") }}
        </h4>
      </div>
    </Card>

    <!-- Screw -->
    <Card
      isHome
      class="text-center lg:order-6 lg:col-start-4 lg:row-span-1 lg:row-start-2"
      :title="$t('Screw')"
      :class="{
        'bg-green-500': screw.current === screw.total && screw.current !== 0,
      }"
    >
      <div class="mt-2 flex justify-center p-4">
        <p class="mr-2 text-3xl font-bold">
          {{ screw.current }}
        </p>
        <p class="text-3xl font-bold text-gray-500">/{{ screw.total }}</p>
      </div>
      <p
        v-if="screw.current === screw.total && screw.current !== 0"
        class="mb-4 text-3xl font-bold text-white"
      >
        All OK
      </p>
    </Card>

    <!-- Error code -->
    <Card
      isHome
      class="text-center lg:order-7 lg:row-span-2"
      :title="$t('ErrorCode')"
    >
      <div class="flex flex-1 flex-col items-center justify-center py-6">
        <h4 class="p-2 text-center text-xl" v-if="result.firstError !== 0">
          <span v-if="result.firstError === 1"
            >EA-01 {{ $t("OverMaxTor") }}</span
          >
          <span v-else>EA-02 {{ $t("OverMinTor") }}</span>
        </h4>
        <h4 class="p-2 text-center text-xl" v-if="result.secondError !== 0">
          <span v-if="result.secondError === 4"
            >EA-03 {{ $t("OverMaxTime") }}</span
          >
          <span v-else-if="result.secondError === 8"
            >EA-04 {{ $t("OverMinTime") }}</span
          >
          <span v-else-if="result.secondError === 16"
            >EA-05 {{ $t("OverMaxTurns") }}</span
          >
          <span v-else>EA-06 {{ $t("OverMinTurns") }}</span>
        </h4>
      </div>
    </Card>

    <router-view />

    <!-- Send password -->
    <Modal
      class="py-6"
      :open="state.lockwindow"
      @close="
        state.lockwindow = false;
        state.isCodeError = false;
      "
    >
      <div
        class="flex w-full items-center justify-around bg-gray-100 py-6 text-xl"
      >
        <label for="lockCode">{{ $t("CodeInput") }}</label>
        <input
          v-model="state.lockCode"
          maxlength="8"
          type="password"
          class="border border-gray-300 px-3 py-1"
          name="lockCode"
          id="lockCode"
          ref="lockCode"
          @keyup.enter.prevent="
            if (state.lockCode.length > 3) {
              sendLockCode();
            }
          "
        />
      </div>

      <div class="flex items-center justify-end gap-3 bg-white py-2 px-4">
        <strong v-if="state.isCodeError" class="text-red-500">{{
          $t("PasswordError")
        }}</strong>
        <Btn
          @click.prevent="sendLockCode()"
          :disabled="state.lockCode.length < 4"
        >
          {{ $t("Confirm") }}
        </Btn>
      </div>
    </Modal>

    <!-- Barcode -->
    <Modal
      :title="'Barcode'"
      :open="barcode.isBarcode"
      :top="true"
      :toast="true"
      :className="'lucent:bg-lucent'"
      @close="barcode.isBarcode = false"
    >
      <div class="flex w-full justify-center bg-gray-200 py-6 px-4">
        <strong class="text-3xl">{{ barcode.val }}</strong>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import ButtonGroup from "../components/ButtonGroup.vue";
import DataView from "../components/DataView.vue";
import LockBtn from "../components/LockBtn.vue";
import Service, { FuncType } from "../websocket";
import {
  useTime,
  useTorque,
  useTurns,
  useScrew,
  useResult,
  useCurrent,
  useBarcode,
  useUnit,
} from "../store/monitor";
import { defineProps, defineEmits, ref, reactive, onMounted } from "vue";

const service = Service(window.ip);

const { time } = useTime();
const { torque } = useTorque();
const { turns } = useTurns();
const { screw } = useScrew();
const { result } = useResult();
const { current } = useCurrent();
const { barcode } = useBarcode();
const { unit } = useUnit();

const lockCode = ref<HTMLElement | null>(null);

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["close"]);

const state = reactive({
  lockCode: "",
  isLoading: false,
  lockwindow: false,
  isLock: false,
  isCodeError: false,
  isLocked: 0,
});

function openModal() {
  state.lockwindow = true;
  lockCode.value?.focus();
}

function sendLockCode() {
  state.isLoading = true;

  const lockPassword = state.lockCode;
  state.lockCode = "";

  const lockPasswordLen = lockPassword.length;
  const sendLockPassword = JSON.stringify({
    lockPasswordLen,
    lockPassword,
  });

  console.log(`sendlockpassword: ${sendLockPassword}`);

  service.send(sendLockPassword);
}

onMounted(() => {
  service.addEventListener(FuncType.Msg, (e) => {
    if ("isLocked" in e) {
      state.isLocked = parseInt(e.isLocked, 10);

      if (state.isLocked === 0) {
        state.isCodeError = false;
        state.isLoading = false;
        state.lockwindow = false;
      } else if (
        state.isLocked === 2 ||
        state.isLocked === 4 ||
        state.isLocked === 6
      ) {
        state.isCodeError = true;
        state.isLoading = false;
        state.lockwindow = true;
      }
    }
  });
});
</script>
