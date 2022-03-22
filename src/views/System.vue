<template>
  <Loading :isLoading="state.isLoading" />
  <div class="flex flex-col items-center justify-center gap-4">
    <!-- Device -->
    <Card :title="$t('DeviceRename')" class="w-full lg:w-3/5">
      <div class="flex flex-col px-4 py-6">
        <div class="flex text-gray-400">
          <label class="w-1/3 text-2xl">Device</label>
          <NumberInput
            :name="'device'"
            class="w-1/4 flex-1 rounded border border-gray-600 py-1 text-center text-2xl"
            type="number"
            v-model="device.number"
            :max="239"
            :min="0"
            :precision="0"
          />
          <div class="flex-1"></div>
        </div>
        <div class="mt-8 flex justify-center">
          <DarkBtn
            @click.prevent="sendDevice"
            :disabled="device.number.toString().length === 0"
          >
            {{ $t("Confirm") }}
          </DarkBtn>
        </div>
      </div>
    </Card>

    <!-- Language -->
    <Card :title="$t('Language')" class="w-full lg:w-3/5">
      <div class="flex px-4 py-6 text-gray-400">
        <select
          class="w-40 border border-gray-600 py-1 px-2 text-2xl"
          name="langSelect"
          id="langSelect"
          v-model="$i18n.locale"
          @change="sendLan()"
        >
          <option
            v-for="(lang, i) in state.langs"
            :key="`Lang${i}`"
            :value="lang.name"
          >
            {{ lang.text }}
          </option>
        </select>
      </div>
    </Card>

    <!-- Unit -->
    <Card :title="$t('Torque') + $t('Unit')" class="w-full lg:w-3/5">
      <div class="flex px-4 py-6 text-gray-400">
        <select
          class="w-40 border border-gray-600 py-1 px-2 text-2xl"
          name="langSelect"
          id="langSelect"
          v-model="state.selectUnit"
          @change="sendUnit"
        >
          <option
            :value="{ value: unit.value, name: unit.name }"
            v-for="(unit, i) in state.units"
            :key="i"
          >
            {{ unit.name }}
          </option>
        </select>
      </div>
    </Card>

    <!-- Password setting -->
    <Card :title="$t('CodeSetting')" class="w-full lg:w-3/5">
      <div class="flex flex-col gap-10 px-4 py-6">
        <ul class="flex w-full gap-6 text-center text-base md:w-4/5 md:text-xl">
          <li
            class="py-2"
            :class="[
              state.auth === 0 ? 'border-b-4 border-gray-500' : 'text-gray-400',
            ]"
          >
            <button @click="state.auth = 0">
              {{ $t("Master") }}
            </button>
          </li>
          <li
            class="py-2"
            :class="[
              state.auth === 1 ? 'border-b-4 border-gray-500' : 'text-gray-400',
            ]"
          >
            <button @click="state.auth = 1">{{ $t("Manager_1") }}</button>
          </li>
          <li
            class="py-2"
            :class="[
              state.auth === 2 ? 'border-b-4 border-gray-500' : 'text-gray-400',
            ]"
          >
            <button @click="state.auth = 2">{{ $t("Manager_2") }}</button>
          </li>
        </ul>
        <Master
          v-if="state.auth === 0"
          :isClear="state.isClear"
          v-model="state.isLoading"
        />
        <Manager1
          v-if="state.auth === 1"
          :isClear="state.isClear"
          v-model="state.isLoading"
        />
        <Manager2
          v-if="state.auth === 2"
          :isClear="state.isClear"
          v-model="state.isLoading"
        />
      </div>
    </Card>

    <div class="mt-10 flex w-full flex-col gap-16 md:w-2/5">
      <!-- System Reset -->
      <SystemButton :title="$t('SystemReset')" @click="systemReset" />

      <!-- Time Sync -->
      <SystemButton :title="$t('TimeReset')" @click="timeSync" />

      <!-- System update -->
      <router-link
        to="/update"
        class="flex-1 bg-gray-400 py-2 px-4 text-center text-2xl text-white shadow-dark transition-colors duration-500 ease-in-out hover:bg-gray-600 active:bg-gray-600 active:shadow-none"
        >{{ $t("Update") }}</router-link
      >
    </div>
  </div>
  <!-- System Reset Modal -->
  <Modal class="py-6" :open="state.isReset" @close="state.isReset = false">
    <h5 class="bg-gray-100 py-6 text-center text-xl">
      {{ $t("SystemResetComplete") }}
    </h5>
    <div class="flex justify-end bg-white py-2 px-4">
      <Btn
        @click.prevent="state.isReset = false"
        ref="resetBtn"
        :isFocus="state.isResetBtn"
      >
        {{ $t("Close") }}
      </Btn>
    </div>
  </Modal>
  <!-- Device Set finish Modal -->
  <Modal class="py-6" :open="set.setDeviceOk === 1">
    <h5 class="bg-gray-100 py-6 text-center text-xl">
      {{ $t("DeviceSetComplete") }}<br />
      {{ $t("UpdateAlert") }}
    </h5>
  </Modal>
  <!-- System Password setting finish Modal -->
  <Modal
    class="py-6"
    :open="state.isOk"
    @close="state.isOk = false"
    ref="passModal"
  >
    <h5 v-if="state.auth === 0" class="bg-gray-100 py-6 text-center text-xl">
      {{ $t("MasterSetComplete") }}
    </h5>
    <h5 v-if="state.auth === 1" class="bg-gray-100 py-6 text-center text-xl">
      {{ $t("Man1SetComplet") }}
    </h5>
    <h5 v-if="state.auth === 2" class="bg-gray-100 py-6 text-center text-xl">
      {{ $t("Man2SetComplet") }}
    </h5>
    <div class="flex justify-end bg-white py-2 px-4">
      <Btn
        @click.prevent="
          state.isOk = false;
          state.isClear = false;
        "
        id="passwordBtn"
        ref="passwordBtn"
        :isFocus="state.isPassStatus"
      >
        {{ $t("Close") }}
      </Btn>
    </div>
  </Modal>
  <!-- Time Sync Modal -->
  <Modal
    :title="$t('TimeSynchronization')"
    class="py-6 text-xl"
    :open="state.isTimeSync"
    @close="state.isTimeSync = false"
  >
    <div
      class="flex w-full items-center justify-center gap-4 bg-gray-100 py-4 text-right"
    >
      <label for="compputerTime" class="w-1/2">{{ $t("ComputerTime") }}</label>
      <input
        class="bg-gray-100"
        type="text"
        name="compputerTime"
        id="compputerTime"
        v-model="state.date.total"
        readonly
      />
    </div>
    <div
      class="flex w-full items-center justify-center gap-4 bg-gray-100 py-4 text-right"
    >
      <label for="controllerTime" class="w-1/2">{{
        $t("ControllerTime")
      }}</label>
      <input
        class="bg-gray-100"
        type="text"
        name="controllerTime"
        id="controllerTime"
        readonly
        v-model="state.controllerDate.total"
      />
    </div>
    <div class="flex justify-end bg-white py-2 px-4">
      <Btn
        @click.prevent="state.isTimeSync = false"
        ref="timeBtn"
        :isFocus="state.isTimeBtn"
      >
        {{ $t("Close") }}
      </Btn>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "../components/Modal.vue";
import SystemButton from "../components/SystemButton.vue";
import Loading from "../components/Loading.vue";
import Master from "../components/Master.vue";
import Manager1 from "../components/Manager_1.vue";
import Manager2 from "../components/Manager_2.vue";
import { useDevice, useUnit, useDates } from "../store/monitor";
import { useSet } from "../store/Check";
import Service, { FuncType } from "../websocket";
import NumberInput from "../components/numeric-input.vue";
import { reactive, ref, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { Msg } from "../types";

const service = Service(window.ip);
const { locale } = useI18n({});
const { device } = useDevice();
const { unit } = useUnit();
const { set } = useSet();
const { dates } = useDates();
const passwordRef = ref<HTMLElement | null>(null);

const state = reactive({
  isLoading: true,
  isPass: false,
  isReset: false,
  isOk: false,
  isTimeSync: false,
  isClear: false,
  isPassStatus: false,
  isTimeBtn: false,
  isResetBtn: false,
  auth: 0,
  langs: [
    { name: "ch", text: "繁體中文", value: 0 },
    { name: "cn", text: "简体中文", value: 1 },
    { name: "en", text: "English", value: 2 },
    { name: "jp", text: "日本語", value: 3 },
  ],
  selectUnit: { value: unit.value.value, name: unit.value.name },
  units: [
    { value: 0, name: "Nm" },
    { value: 1, name: "kgf-cm" },
    { value: 2, name: "lb-in" },
  ],
  date: {
    total: "",
    year: 0,
    month: 0,
    day: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
  controllerDate: {
    total: "",
    year: 0,
    month: 0,
    day: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
});

function sendDevice() {
  const sendDevice = JSON.stringify({
    setDeviceOk: 0,
    device: Number(device.value.number),
  });
  console.log(`send device: ${sendDevice}`);
  service.send(sendDevice);
}

function sendLan() {
  let lang = 0;
  if (locale.value === "ch") lang = 0;
  if (locale.value === "cn") lang = 1;
  if (locale.value === "en") lang = 2;
  if (locale.value === "jp") lang = 3;
  const sendLang = JSON.stringify({ language: lang });
  console.log(`sendlang: ${sendLang}`);
  service.send(sendLang);
}

function sendUnit() {
  const unitVal = Number(state.selectUnit.value);
  const sendUnit = JSON.stringify({ unit: unitVal });
  console.log(`sendUnit: ${sendUnit}`);
  service.send(sendUnit);
}

function getNowDate() {
  const date = new Date();
  state.date.year = date.getFullYear();
  state.date.month = date.getMonth() + 1;
  state.date.day = date.getDate();
  state.date.hours = date.getHours();
  state.date.minutes = date.getMinutes();
  state.date.seconds = date.getSeconds();
  console.log(
    `${state.date.year}/${state.date.month}/${state.date.day} ${state.date.hours}:${state.date.minutes}:${state.date.seconds}`
  );
}

function systemReset() {
  const setSystemOk = 0;
  const sendSystemOk = JSON.stringify({ setSystemOk });
  service.send(sendSystemOk);
  state.isLoading = true;
}

function checkReset() {
  if (set.value.setSystemOk !== undefined) {
    const setSystemOk = Number(set.value.setSystemOk);
    if (setSystemOk === 1) {
      state.isLoading = false;
      state.isReset = true;
    }
  }
}

function timeSync() {
  state.isLoading = true;
  getNowDate();
  const sendDate = JSON.stringify({
    setTimeOk: 0,
    year: state.date.year,
    month: state.date.month,
    day: state.date.day,
    hours: state.date.hours,
    minutes: state.date.minutes,
    seconds: state.date.seconds,
  });
  console.log(sendDate);
  service.send(sendDate);
}

function checkPass(auth: number, val: number) {
  (document.activeElement as HTMLButtonElement).blur();
  if (auth === 1) {
    // passwordRef.value?.focus();
    const btn = document.querySelector<HTMLButtonElement>("#passwordBtn");
    btn?.focus();
    state.isPassStatus = true;
    state.auth = val;
    state.isLoading = false;
    state.isClear = true;
    state.isOk = true;
    auth = 0;
    console.log(document.activeElement);
  }
}

function checkSetPassword() {
  if (set.value.setMasterOk === 1) {
    checkPass(set.value.setMasterOk, 0);
    set.value.setMasterOk = 0;
  } else if (set.value.setMan1Ok === 1) {
    checkPass(set.value.setMan1Ok, 1);
    set.value.setMan1Ok = 0;
  } else if (set.value.setMan2Ok === 1) {
    checkPass(set.value.setMan2Ok, 2);
    set.value.setMan2Ok = 0;
  }
}

function hasUnit(e: Msg) {
  return "unit" in e;
}

function checkTime() {
  if (set.value.setTimeOk === 1) {
    state.isTimeBtn = true;
    state.isLoading = false;
    state.isTimeSync = true;
    state.date.total = `${state.date.year}/${state.date.month}/${state.date.day} ${state.date.hours}:${state.date.minutes}:${state.date.seconds}`;
    state.controllerDate.total = `${dates.value.year}/${dates.value.month}/${dates.value.day} ${dates.value.hours}:${dates.value.minutes}:${dates.value.seconds}
        `;
    set.value.setTimeOk = 0;
  }
}

function checkSystem() {
  if (set.value.setSystemOk === 1) {
    console.log("ok");
    state.isResetBtn = true;
    state.isLoading = false;
    state.isReset = true;
    set.value.setSystemOk = 0;
  }
}

onMounted(() => {
  service.addEventListener(FuncType.Msg, (e) => {
    if (hasUnit(e)) {
      state.isLoading = false;
    }
  });
});

watch(
  () => set.value,
  () => {
    checkSetPassword();
    checkReset();
    checkTime();
    checkSystem();
  },
  { deep: true }
);

watch(
  () => unit.value,
  () => {
    state.selectUnit.value = unit.value.value;
    state.selectUnit.name = unit.value.name;
  }
);
</script>

<style>
input::placeholder {
  font-size: 14px;
  opacity: 0.4;
}
</style>
