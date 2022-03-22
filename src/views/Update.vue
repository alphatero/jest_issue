<template>
  <Loading :isLoading="state.isLoading" :def="state.isBootload">
    <div
      v-if="state.isBootload"
      class="flex w-4/5 max-w-4xl flex-wrap justify-center gap-3 p-4"
    >
      <h5 class="text-black">{{ $t("DontBreakAlert") }}</h5>
      <span class="flex w-full justify-end pr-2 text-xs text-white"
        >{{ update.progress }}%</span
      >
      <ProgressBar
        v-if="state.isBootload"
        :className="'h-5'"
        :percentage="update.progress"
        :color="'gray'"
        ><span class="flex w-full justify-end pr-2 text-xs text-white"
          >{{ update.progress }}%</span
        ></ProgressBar
      >
    </div>
    <div v-else class="mt-28 flex w-4/5 max-w-4xl justify-center p-4">
      <h5 class="text-black">{{ $t("DontBreakAlert") }}</h5>
    </div>
  </Loading>
  <div class="flex flex-col items-center gap-6">
    <!-- Web server update -->
    <Card :title="$t('UpdateWebServerTitle')" class="w-full lg:w-3/5">
      <div class="flex justify-center px-10 py-6 text-2xl text-gray-400">
        <div class="mx-4 flex flex-1 rounded-lg border border-gray-300">
          <label
            class="border-blue flex flex-1 cursor-pointer flex-col items-center rounded-l-lg border bg-white px-4 py-2 tracking-wide text-gray-400 hover:text-gray-600"
          >
            <span class="mt-2 text-base leading-normal">{{
              state.webFile
            }}</span>
            <input
              ref="serverUpdate"
              type="file"
              class="hidden"
              @change="selectWebFile()"
              accept=".bin"
            />
          </label>
          <button
            :class="[
              'rounded-r-lg border bg-white px-3 transition-all duration-300 ',
              'kemp:border-kemp-dark kemp:text-kemp-dark',
              'kemp:hover:bg-kemp-dark kemp:hover:text-white',
              'hr:border-highright hr:text-highright',
              'hr:hover:bg-highright hr:hover:text-white',
              'lucent:border-lucent-dark lucent:text-lucent-dark',
              'lucent:hover:bg-lucent-dark lucent:hover:text-white',
              state.webFile !== 'Choose file'
                ? ''
                : [
                    'pointer-events-none kemp:border-kemp kemp:text-kemp',
                    'lucent:border-lucent lucent:text-lucent',
                    'hr:border-highright hr:text-highright',
                  ],
            ]"
            @click.prevent="handleWebUpload"
          >
            {{ $t("Import") }}
          </button>
        </div>
      </div>
    </Card>

    <!-- Controller update -->
    <Card :title="$t('UpdateControllerTitle')" class="w-full lg:w-3/5">
      <div class="flex justify-center px-10 py-6 text-2xl text-gray-400">
        <div class="mx-4 flex flex-1 rounded-lg border border-gray-300">
          <label
            class="border-blue flex flex-1 cursor-pointer flex-col items-center rounded-l-lg border bg-white px-4 py-2 tracking-wide text-gray-400 hover:text-gray-600"
          >
            <span class="mt-2 text-base leading-normal">{{
              state.controllerFile
            }}</span>
            <input
              ref="controllerUpdate"
              type="file"
              class="hidden"
              @change="selectControllerFile()"
              accept=".hex"
            />
          </label>
          <button
            :class="[
              'rounded-r-lg border bg-white px-3 duration-300',
              'kemp:border-kemp-dark kemp:text-kemp-dark',
              'kemp:hover:bg-kemp-dark kemp:hover:text-white',
              'hr:border-highright hr:text-highright',
              'hr:hover:bg-highright hr:hover:text-white',
              'lucent:border-lucent-dark lucent:text-lucent-dark',
              'lucent:hover:bg-lucent-dark lucent:hover:text-white',
              state.controllerFile !== 'Choose file'
                ? ''
                : [
                    'pointer-events-none kemp:border-kemp kemp:text-kemp ',
                    'lucent:border-lucent lucent:text-lucent',
                    'hr:border-highright hr:text-highright',
                  ],
            ]"
            @click.prevent="sendBootload()"
          >
            {{ $t("Import") }}
          </button>
        </div>
      </div>
    </Card>
  </div>
  <Modal :noclose="true" :open="state.isFinish" :alert="true">
    <div class="flex justify-center bg-gray-100 py-4">
      <strong class="text-xl">
        {{ $t("UpdateAlert") }}
      </strong>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import $ from "jquery";
import ProgressBar from "../components/ProgressBar.vue";
import Service from "../websocket";
import { useUpdate } from "../store/Check";
import { ref, reactive, watch } from "vue";
import { useI18n } from "vue-i18n";

const service = Service(window.ip);

const { update } = useUpdate();

const { t } = useI18n();

const state = reactive({
  isLoading: false,
  webFile: "Choose file",
  controllerFile: "Choose file",
  contentProgress: 30,
  isBootload: false,
  isFinish: false,
});

const serverUpdate = ref<HTMLFormElement | null>(null);
const controllerUpdate = ref<HTMLFormElement | null>(null);

function selectWebFile() {
  console.log(serverUpdate.value?.files);
  const importFile = serverUpdate.value?.files[0];
  console.log(importFile);
  state.webFile = importFile.name;
}

function selectControllerFile() {
  const importFile = controllerUpdate.value?.files[0];
  state.controllerFile = importFile.name;
}

function handleWebUpload() {
  state.isLoading = true;
  state.isBootload = false;
  const file = serverUpdate.value?.files[0];
  const data = new FormData();
  data.append("file", file);
  const msg = t("UpdateAlert");
  $.ajax({
    url: "/upload",
    type: "POST",
    data,
    contentType: false,
    processData: false,
    xhr() {
      const xhr = new window.XMLHttpRequest();
      xhr.upload.addEventListener(
        "progress",
        function (evt) {
          if (evt.lengthComputable) {
            const per = evt.loaded / evt.total;
            update.value.progress = Math.round(per * 100);
          }
        },
        false
      );
      return xhr;
    },
    success() {
      alert(msg);
      console.log("success!");
    },
    error() {
      console.log("error");
    },
  });
  update.value.progress = 0;
}

function sendBootload() {
  state.isLoading = true;
  state.isBootload = true;
  update.value.progress = 0;
  const bootloadOk = 0;
  const sendBootload = JSON.stringify({ bootloadOk });
  console.log(sendBootload);
  service.send(sendBootload);
}

function handleControllerUpload() {
  console.log("ready send boot");
  const file = controllerUpdate.value?.files[0];
  const data = new FormData();
  data.append("file", file);
  const ENDPOINT = "/boot";
  fetch(ENDPOINT, {
    method: "POST",
    body: data,
  }).then(() => {
    console.log("success");
  });

  update.value.progress = 0;
}

watch(
  () => update.value.bootloadOk,
  () => {
    if (update.value.bootloadOk === 1) {
      update.value.bootloadOk = 0;
      handleControllerUpload();
    } else if (update.value.bootloadOk === 2) {
      state.isFinish = true;
      update.value.bootloadOk = 0;
      console.log("bootload is finish");
      state.isLoading = false;
      state.isBootload = false;
    }
  }
);

watch(
  () => update.value.updateOk,
  () => {
    if (update.value.updateOk === 1) {
      state.isLoading = false;
      state.isFinish = true;
      update.value.updateOk = 0;
    }
  }
);
</script>
