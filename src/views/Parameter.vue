<template>
  <Loading :isLoading="state.isLoading" />
  <div class="flex flex-col gap-4">
    <!-- Import and Export file -->
    <ImportExportParameter
      v-model:importOver="state.importOver"
      :exportObj="packageParameter()"
    />

    <!-- Torque -->
    <Torque :torque="torque" :error="state.error" :spec="spec" :unit="unit" />

    <!-- Judge Select -->
    <JudeRule :lock-rule="lockRule" :check-ng-lock="checkNgLock" />

    <!-- Time -->

    <Card :title="$t('Time')" v-if="Number(lockRule.judgeSelect) === 0">
      <Time :time="time" :error="state.error" :unit="unit" />
    </Card>
    <!-- Turns -->
    <Card :title="$t('Turns')" v-else>
      <Turns :turns="turns" :error="state.error" :unit="unit" />
    </Card>

    <!-- Screw -->
    <Screw :screw="screw" :error="state.error" :unit="unit" />

    <!-- Speed -->
    <Speed
      :speed="speed"
      :error="state.error"
      :unit="unit"
      :lockRule="lockRule"
    />

    <!-- Offset -->
    <Offset
      :offset="offset"
      :spec="spec"
      :error="state.error"
      :unit="unit"
      :torque="torque"
    />

    <!-- Lockrule -->
    <!-- <Lockrule :lockRule="lockRule" :check-ng-lock="checkNgLock" /> -->
    <Card :title="$t('Lockrule')">
      <div class="flex flex-col py-6">
        <div class="flex flex-col border-b border-gray-200 p-4 text-gray-400">
          <NgLock :lock-rule="lockRule" :check-ng-lock="checkNgLock" />
          <Lockrule :lock-rule="lockRule" />
        </div>

        <Advence :lock-rule="lockRule" />
      </div>
    </Card>

    <div class="mt-4 flex justify-center">
      <button
        class="actvie:text-white rounded py-2 px-4 shadow-solid transition-all duration-300 hover:text-white active:scale-95 active:shadow-none kemp:bg-kemp kemp:hover:bg-kemp-dark kemp:active:bg-kemp-dark hr:bg-highright hr:hover:bg-highright-dark hr:active:bg-highright-dark lucent:bg-lucent lucent:hover:bg-lucent-dark lucent:active:bg-lucent-dark"
        @click.prevent="submitForm"
      >
        {{ $t("SendSetting") }}
      </button>
    </div>
  </div>

  <!-- Setting finish -->
  <modal
    :title="$t('SetModal')"
    :open="state.setOver"
    @close="state.setOver = false"
  >
    <div class="flex justify-center bg-gray-100 py-4">
      <h5 class="text-2xl">
        {{ $t("Complete") }}
      </h5>
    </div>
    <div class="flex justify-end bg-gray-50 py-2 px-4">
      <Btn
        @click="state.setOver = false"
        ref="submitBtn"
        :isFocus="state.isSubmit"
      >
        {{ $t("Close") }}
      </Btn>
    </div>
  </modal>

  <!-- Format error modal -->
  <modal
    :title="$t('FormatError')"
    :open="state.isError"
    @close="state.isError = false"
  >
    <div
      class="flex flex-col items-center justify-center bg-gray-100 py-4 text-2xl text-red-500"
    >
      <h5>{{ $t("CheckFormat") }}:</h5>
      <p>
        <span v-if="state.error.torque">{{ " " }}{{ $t("Torque") }}</span>
        <span v-if="state.error.time">{{ " " }}{{ $t("Time") }}</span>
        <span v-if="state.error.turns">{{ " " }}{{ $t("Turns") }}</span>
        <span v-if="state.error.screw">{{ " " }}{{ $t("Screw") }}</span>
        <span v-if="state.error.speed">{{ " " }}{{ $t("Speed") }}</span>
      </p>
    </div>
    <div class="flex justify-end bg-gray-50 py-2 px-4">
      <Btn
        @click="state.isError = false"
        ref="errorModalBtn"
        :isFocus="state.isErrorBtn"
      >
        {{ $t("Confirm") }}
      </Btn>
    </div>
  </modal>

  <!-- Import paramter file -->
  <modal
    :title="$t('Import') + $t('Parameter')"
    :open="state.importOver"
    :top="true"
    @close="state.importOver = false"
  >
    <div class="p flex justify-center bg-gray-100 py-6">
      <div class="mx-4 flex flex-1 rounded-lg border border-gray-300">
        <label
          class="border-blue flex flex-1 cursor-pointer flex-col items-center rounded-l-lg border bg-white px-4 py-2 uppercase tracking-wide text-gray-500 hover:text-gray-600"
        >
          <span class="mt-2 text-base leading-normal">{{ state.file }}</span>
          <input
            name="importFile"
            id="importRef"
            type="file"
            class="hidden"
            @input="selectedFile"
            accept=".json"
          />
        </label>
        <button
          class="rounded-r-lg border bg-white px-3 transition-all duration-300 kemp:border-kemp-dark kemp:text-kemp-dark kemp:hover:bg-kemp-dark kemp:hover:text-white hr:border-highright hr:text-highright hr:hover:bg-highright hr:hover:text-white lucent:border-lucent-dark lucent:text-lucent-dark lucent:hover:bg-lucent-dark lucent:hover:text-white"
          :class="
            state.file === 'Choose file'
              ? [
                  'pointer-events-none kemp:border-kemp-light kemp:text-kemp-light',
                  'lucent:border-lucent-light lucent:text-lucent-light',
                ]
              : ''
          "
          @click.prevent="importParameter"
        >
          {{ $t("Import") }}
        </button>
      </div>
    </div>
  </modal>
</template>

<script setup lang="ts">
import { Msg } from "../types";
import Modal from "../components/Modal.vue";
import {
  useTime,
  useTurns,
  useTorque,
  useScrew,
  useSpeed,
  useOffset,
  useSpecTorque,
  useUnit,
} from "../store/monitor";
import { useLockRule } from "../store/lock";
import Service, { FuncType } from "../websocket";
import { ref, reactive, onMounted, watch } from "vue";
import {
  validateSimpleVal,
  validateValue,
  torqueRev,
  timeRev,
  turnsRev,
  offsetRev,
} from "../utils";
import ImportExportParameter from "../components/Parameter/ImportExportParameter.vue";
import Torque from "../components/Parameter/Torque.vue";
import JudeRule from "../components/Parameter/JudeRule.vue";
import Time from "../components/Parameter/Time.vue";
import Turns from "../components/Parameter/Turns.vue";
import Screw from "../components/Parameter/Screw.vue";
import Speed from "../components/Parameter/Reduce.vue";
import Offset from "../components/Parameter/Offset.vue";
import Lockrule from "../components/Parameter/Lockrule.vue";
import NgLock from "../components/Parameter/NgLock.vue";
import Advence from "../components/Parameter/Advence.vue";
import { useSet } from "../store/Check/set";

const service = Service(window.ip);

const { torque } = useTorque();
const { time } = useTime();
const { turns } = useTurns();
const { screw } = useScrew();
const { speed } = useSpeed();
const { lockRule } = useLockRule();
const { offset } = useOffset();
const { spec } = useSpecTorque();
const { unit } = useUnit();
const { set } = useSet();
const errorModalBtn = ref<HTMLElement | null>(null);
const importRef = document.querySelector<HTMLInputElement>("#importRef");
const submitBtn = ref(null);

const state = reactive({
  setOver: false,
  isSubmit: false,
  importOver: false,
  sendPackage: {},
  file: "Choose file",
  tempFile: "" || {},
  isPass: false,
  isLoading: true,
  isError: false,
  isErrorBtn: true,
  error: {
    torque: false,
    time: false,
    turns: false,
    screw: false,
    speed: false,
    offset: false,
  },
});

function hasParameter(e: Msg) {
  return "ngLock" in e;
}

function checkNgLock() {
  if (Number(lockRule.value.ngLock) === 1) {
    if (Number(lockRule.value.judgeSelect) === 0) {
      lockRule.value.overMaxTurns = 2;
      lockRule.value.overMinTurns = 2;
      lockRule.value.overMaxTime = 1;
      lockRule.value.overMinTime = 1;
    } else {
      lockRule.value.overMaxTime = 2;
      lockRule.value.overMinTime = 2;
      lockRule.value.overMaxTurns = 1;
      lockRule.value.overMinTurns = 1;
    }
    lockRule.value.overMaxTorque = 1;
    lockRule.value.overMinTorque = 1;
  } else {
    lockRule.value.overMaxTorque = 2;
    lockRule.value.overMinTorque = 2;
    lockRule.value.overMaxTime = 2;
    lockRule.value.overMinTime = 2;
    lockRule.value.overMaxTurns = 2;
    lockRule.value.overMinTurns = 2;
  }
}

function submitForm() {
  state.error.torque = !validateValue(
    torque.value.target,
    torque.value.max,
    torque.value.min,
    spec.value.maxUpper
  );
  state.error.time = !validateValue(
    time.value.target,
    time.value.max,
    time.value.min,
    4
  );
  state.error.turns = !validateValue(
    turns.value.target,
    turns.value.max,
    turns.value.min,
    99
  );
  state.error.screw = !validateSimpleVal(screw.value.total, 99, 0);
  state.error.speed = !validateSimpleVal(speed.value.val, 1200, 0);
  state.error.offset = !validateSimpleVal(
    offset.value.val,
    spec.value.max * 0.1,
    -(spec.value.max * 0.1)
  );
  if (
    state.error.torque ||
    state.error.time ||
    state.error.turns ||
    state.error.screw ||
    state.error.speed ||
    state.error.offset
  ) {
    state.isError = true;
    state.isErrorBtn = true;
  } else {
    sendParameter();
  }
}

function sendParameter() {
  state.isLoading = true;
  const sendPackage = JSON.stringify(packageParameter());
  service.send(sendPackage);
}

function packageParameter() {
  const sendObj = {
    tarTorque: torqueRev(torque.value.target),
    maxTorque: torqueRev(torque.value.max),
    minTorque: torqueRev(torque.value.min),
    tarTime: timeRev(time.value.target),
    maxTime: timeRev(time.value.max),
    minTime: timeRev(time.value.min),
    tarTurns: turnsRev(turns.value.target),
    maxTurns: turnsRev(turns.value.max),
    minTurns: turnsRev(turns.value.min),
    offset: offsetRev(offset.value.val),
    totalScrew: screw.value.total,
    speed: speed.value.val,
    ngLock: Number(lockRule.value.ngLock),
    overMaxTorque: lockRule.value.overMaxTorque,
    overMinTorque: lockRule.value.overMinTorque,
    overMaxTurns: lockRule.value.overMaxTurns,
    overMinTurns: lockRule.value.overMinTurns,
    overMaxTime: lockRule.value.overMaxTime,
    overMinTime: lockRule.value.overMinTime,
    lockSelect: lockRule.value.lockSelect,
    judgeSelect: Number(lockRule.value.judgeSelect),
    countLock: Number(screw.value.countLock),
    reduceRpm: Number(lockRule.value.reduceRpm),
  };
  console.log(sendObj);
  return sendObj;
}

function selectedFile(e: Event) {
  const target = <HTMLInputElement>e.currentTarget;
  if (!target.files) return;
  console.log(target.files[0]);
  console.log("select a file");

  const importFile = target.files[0];
  state.file = importFile.name;

  if (importFile.type !== "application/json") return;

  const reader = new FileReader();

  reader.readAsText(importFile, "UTF-8");
  reader.onload = (evt) => {
    state.tempFile = <Object>evt.target?.result;
    console.log(state.tempFile);
  };
  reader.onerror = (evt) => {
    console.error(evt);
  };
}

function importParameter() {
  state.importOver = false;
  state.isLoading = true;
  const sendJson = state.tempFile;
  console.log(sendJson);
  service.send(sendJson.toString());
}

onMounted(() => {
  service.addEventListener(FuncType.Msg, (e) => {
    if (hasParameter(e)) state.isLoading = false;
  });
});

watch(
  () => set.value.setParamOk,
  () => {
    if (set.value.setParamOk === 1) {
      state.isLoading = false;
      state.setOver = true;
      // submitBtn.value.btn.focus();
      set.value.setParamOk = 0;
      state.isSubmit = true;
    }
  }
);
</script>
