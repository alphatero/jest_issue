<template>
  <Loading :isLoading="state.isLoading" :def="state.isDownload">
    <div
      v-if="state.isDownload"
      class="flex w-4/5 max-w-4xl flex-wrap justify-center gap-3 p-4"
    >
      <h5 class="text-black">
        {{ $t("DontBreakAlert") }}
      </h5>

      <ProgressBar
        v-if="state.isDownload"
        :className="'h-5'"
        :percentage="update.progress"
        :color="'gray'"
        ><span class="flex w-full justify-end pr-2 text-xs text-white"
          >{{ update.progress }}%</span
        ></ProgressBar
      >
    </div>
  </Loading>
  <div class="flex flex-col gap-4">
    <!-- Auto Save Select -->
    <Card :title="$t('SaveSetting')">
      <div class="flex flex-col gap-4 py-6 px-5">
        <h3 class="text-xl text-gray-400">
          {{ $t("AutoSave") }}
        </h3>
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2 text-gray-600">
            <input
              v-model="autoSave.val"
              type="radio"
              name="isAutoSaveYes"
              id="isAutoSaveYes"
              value="1"
              @change="sendAutoSave"
            />
            <label for="isAutoSaveYes">{{ $t("Yes") }}</label>
          </div>

          <div class="flex items-center gap-2 text-gray-600">
            <input
              v-model="autoSave.val"
              type="radio"
              name="isAutoSaveNo"
              id="isAutoSaveNo"
              value="0"
              @change="sendAutoSave"
            />
            <label for="isAutoSaveNo">{{ $t("No") }}</label>
          </div>
        </div>
      </div>
    </Card>

    <!-- File Selected -->
    <Card
      :title="$t('FileSelect')"
      :isDataList="true"
      :disabled="state.selected === ''"
      :disabledAll="state.list.length === 0"
      @openAllDelete="openAllDelete()"
      @openOneDelete="state.isOneDelete = true"
    >
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-4 p-5">
          <div
            class="rounded-md border border-gray-500 p-1"
            v-if="fileList.list.length"
          >
            <select
              class="w-full overflow-y-auto p-2 text-xl focus:outline-none"
              name="fileSelect"
              id="fileSelect"
              :size="state.list.length + 1"
              v-model="state.selected"
            >
              <option class="py-1" v-for="(item, key) in state.list" :key="key">
                {{ item }}
              </option>
            </select>
          </div>
          <div class="flex justify-center">
            <div class="flex gap-3">
              <button
                class="rounded-md px-3 py-2 text-white shadow transition-all duration-200"
                :class="[
                  state.selected !== ''
                    ? 'bg-gray-400 hover:bg-gray-600 active:scale-95 active:bg-gray-700'
                    : 'pointer-events-none bg-gray-200',
                ]"
                @click.prevent="sendDownload"
              >
                {{ $t("Download") }}
              </button>
              <button
                class="rounded-md px-3 py-2 text-white shadow transition-all duration-200"
                :class="[
                  state.selected !== ''
                    ? 'bg-gray-400 hover:bg-gray-600 active:scale-95 active:bg-gray-700'
                    : 'pointer-events-none bg-gray-200',
                ]"
                ref="contentBtn"
                @click.prevent="sendSelectContent"
              >
                {{ $t("Content") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>

    <!-- File Content -->
    <Card :title="$t('DataConent')" v-if="state.fileDataList?.length">
      <div
        class="flex flex-col gap-4 p-4"
        v-for="(item, key) in state.fileDataList"
        :key="key"
      >
        <table class="min-w-full table-fixed">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="py-3 font-bold">
                {{ $t("Barcode") }}
              </th>
              <th class="py-3 font-bold">{{ $t("Max") }}{{ $t("Torque") }}</th>
              <th class="py-3 font-bold">{{ $t("Min") }}{{ $t("Torque") }}</th>
              <th class="py-3 font-bold" v-if="item.fileHead.maxTime">
                {{ $t("Max") }}{{ $t("Time") }}
              </th>
              <th class="py-3 font-bold" v-if="item.fileHead?.minTime">
                {{ $t("Min") }}{{ $t("Time") }}
              </th>
              <th class="py-3 font-bold" v-if="item.fileHead?.maxTurns">
                {{ $t("Max") }}{{ $t("Turns") }}
              </th>
              <th class="py-3 font-bold" v-if="item.fileHead?.minTurns">
                {{ $t("Min") }}{{ $t("Turns") }}
              </th>
              <th class="py-3 font-bold">
                {{ $t("Unit") }}
              </th>
              <th class="py-3 font-bold">Total Screw</th>
            </tr>
          </thead>
          <tbody class="bg-gray-100 text-center text-black">
            <tr>
              <td class="py-3">
                {{ item.fileHead?.barcode }}
              </td>
              <td class="py-3">
                {{ item.fileHead?.maxTor }}
              </td>
              <td class="py-3">
                {{ item.fileHead?.minTor }}
              </td>
              <td class="py-3" v-if="item.fileHead?.maxTime">
                {{ item.fileHead.maxTime }}
              </td>
              <td class="py-3" v-if="item.fileHead?.minTime">
                {{ item.fileHead.minTime }}
              </td>
              <td class="py-3" v-if="item.fileHead?.maxTurns">
                {{ item.fileHead.maxTurns }}
              </td>
              <td class="py-3" v-if="item.fileHead?.minTurns">
                {{ item.fileHead.minTurns }}
              </td>
              <td class="py-3">
                {{ item.fileHead?.unit }}
              </td>
              <td class="py-3">
                {{ item.fileHead?.totalGroup }}
              </td>
            </tr>
          </tbody>
        </table>

        <table class="min-w-full table-fixed">
          <thead class="bg-yellow-500 bg-opacity-60 text-black">
            <tr>
              <th class="py-3 font-bold">No.</th>
              <th class="py-3 font-bold">Date</th>
              <th class="py-3 font-bold">Current Tor</th>
              <th class="py-3 font-bold" v-if="item.fileHead?.maxTime">
                Current Time
              </th>
              <th class="py-3 font-bold" v-if="item.fileHead?.maxTurns">
                Current Turns
              </th>

              <th class="py-3 font-bold">Screw</th>
              <th class="py-3 font-bold">OK/NG</th>
            </tr>
          </thead>
          <tbody
            class="bg-yellow-500 bg-opacity-30 text-center text-black"
            v-for="(data, index) in item.fileData"
            :key="index"
          >
            <tr>
              <td class="py-3">
                {{ index + 1 }}
              </td>
              <td class="py-3">
                {{ data.date }}
              </td>
              <td class="py-3">
                {{ data.curTor }}
              </td>
              <td class="py-3" v-if="data.curTime">
                {{ data.curTime }}
              </td>
              <td class="py-3" v-if="data.curTurns">
                {{ data.curTurns }}
              </td>
              <td class="py-3">
                {{ data.curGroup }}
              </td>
              <td class="py-3">
                {{ data.result }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  </div>

  <!-- Modal -->
  <Modal
    :top="true"
    :open="Number(update.showFile) === 1"
    @close="update.showFile = ''"
  >
    <div class="flex justify-center p-6">
      <p class="text-xl font-bold">Done</p>
    </div>
  </Modal>
  <Modal :open="state.isAllDelete" @close="state.isAllDelete = false">
    <div class="flex justify-center p-6">
      <p class="text-xl font-bold">{{ $t("ConfirmTo") }}{{ $t("AllClear") }}</p>
    </div>
    <div class="flex justify-end bg-white py-2 px-4">
      <Btn ref="allDeleteBtn" @click="sendAllDelete">{{ $t("Confirm") }}</Btn>
    </div>
  </Modal>
  <Modal :open="state.isOneDelete" @close="state.isOneDelete = false">
    <div class="flex justify-center p-6">
      <p class="text-xl font-bold">
        {{ $t("ConfirmTo") }}{{ $t("Delete") }}"{{ state.selected }}"
      </p>
    </div>
    <div class="flex justify-end gap-2 bg-white py-2 px-4">
      <Btn @click="sendDeleteFile">{{ $t("Yes") }}</Btn>
      <Btn @click="state.isOneDelete = false">{{ $t("No") }}</Btn>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Service, { FuncType } from "../websocket";
import ProgressBar from "../components/ProgressBar.vue";
import { useAutoSave, usefileList, useDownload } from "../store/Data";
import { useUpdate, useDone } from "../store/Check";
import { reactive, ref, watch, onMounted } from "vue";
import { Msg } from "../types";

const service = Service(window.ip);

const { autoSave } = useAutoSave();
const { fileList } = usefileList();
const { download } = useDownload();
const { update } = useUpdate();
const { isDone } = useDone();

const allDeleteBtn = ref<any>(null);
const contentBtn = ref<any>(null);

const state: StateType = reactive({
  selected: "",
  fileDataList: [],
  arrayLen: -1,
  isDownload: false,
  list: [],
  isLoading: true,
  isAllDelete: false,
  isOneDelete: false,
});

type StateType = {
  selected: string;
  fileDataList: Array<FileDataListType> | [];
  arrayLen: -1;
  isDownload: boolean;
  list: string[];
  isLoading: boolean;
  isAllDelete: boolean;
  isOneDelete: boolean;
};

interface FileHeadType {
  barcode: string;
  maxTor: string;
  minTor: string;
  unit: string;
  totalGroup: string;
  maxTurns?: string;
  minTurns?: string;
  maxTime?: string;
  minTime?: string;
}

interface FileDataType {
  date: string;
  curTor: string;
  curTime?: string;
  curTurns?: string;
  unit: string;
  curGroup: string;
  result: string;
}

interface FileDataListType {
  fileHead: FileHeadType;
  fileData?: Array<FileDataType> | [];
}

function openAllDelete() {
  state.isAllDelete = true;
  allDeleteBtn.value.btn.focus();
}

function sendAutoSave() {
  const auto = Number(autoSave.value.val);
  const autoSaveData = JSON.stringify({
    isAutoSave: auto,
  });
  console.log(`sendAutoSave: ${autoSaveData}`);
  service.send(autoSaveData);
}

function sendDownload() {
  update.value.progress = 0;
  state.isLoading = true;
  state.isDownload = true;
  const fileName = parseInt(state.selected, 10);
  const isDownload = JSON.stringify({
    isDownload: 0,
    fileName,
  });
  console.log(`sendDownload: ${isDownload}`);
  service.send(isDownload);
}

function sendSelectContent() {
  contentBtn.value.blur();
  state.fileDataList = [];
  const fileName = parseInt(state.selected, 10);
  const showFile = JSON.stringify({
    showFile: fileName,
  });
  console.log(`sendShowFile: ${showFile}`);
  service.send(showFile);
  state.selected = "";
  state.arrayLen = -1;
}
function listen(e: any) {
  const i = state.arrayLen;

  if (i === -1) state.fileDataList = [];
  if (hasHead(e)) {
    const headArray = state.fileDataList || [];
    state.fileDataList = headArray.concat({
      ...e,
    });
    state.arrayLen += 1;
  } else if (hasDatas(e)) {
    const temp = e.fileData;
    const intArray = state.fileDataList[i].fileData || [];

    state.fileDataList[i].fileData = intArray.concat(temp);
  }
}

function hasDatas(msg: Msg) {
  return "fileData" in msg;
}

function hasHead(msg: Msg) {
  return "fileHead" in msg && "fileData" in msg;
}

function hasFileList(msg: Msg) {
  return "fileList" in msg;
}

function handleDownload() {
  const downloadName = download.value.fileName;
  const ENDPOINT = "/download";
  fetch(ENDPOINT, {
    method: "GET",
  })
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${downloadName}.txt`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  state.isLoading = false;
}

function sendDeleteFile() {
  const fileName = parseInt(state.selected, 10);
  const deleteFile = JSON.stringify({
    deleteFile: fileName,
  });
  console.log(`sendDeleteFile: ${deleteFile}`);
  service.send(deleteFile);
  state.isLoading = true;
}

function sendAllDelete() {
  const isAllDelete = JSON.stringify({
    isAllDelete: 1,
  });
  console.log(`sendAllDelete: ${isAllDelete}`);
  service.send(isAllDelete);
  state.isLoading = true;
}

onMounted(() => {
  service.addEventListener(FuncType.Msg, (e: Msg) => {
    if (hasFileList(e)) {
      state.isLoading = false;
    }

    listen(e);
  });
});

watch(
  () => download.value.status,
  () => {
    if (download.value.status === 1) {
      handleDownload();
    }
  }
);

watch(
  () => fileList.value.list,
  () => {
    state.list = state.list.concat(fileList.value.list);
  }
);

watch(
  () => isDone.value.val,
  () => {
    if (isDone.value.val === 1) {
      state.isLoading = false;
      state.isOneDelete = false;
      state.isAllDelete = false;
      isDone.value.val = 0;
      state.list = [];
    }
  }
);
</script>
