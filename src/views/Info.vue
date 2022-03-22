<template>
  <Loading :isLoading="state.isLoading" />
  <div class="flex flex-col items-center gap-6">
    <Card
      v-for="(item, key) in state.list"
      class="w-full lg:w-3/5"
      :key="key"
      :title="$t(item.title)"
    >
      <div
        class="flex justify-center px-10 py-6 text-2xl text-gray-400"
        key="key"
      >
        {{ version[item.context] }}
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Msg } from "../types";
import { onMounted, reactive } from "vue";
import { useVersion } from "../store/Info";
import Service, { FuncType } from "../websocket";

const service = Service(window.ip);

const { version } = useVersion();

function hasInfo(msg: Msg) {
  return "firmwareVersion" in msg;
}

enum VersionType {
  Firmware = "firmware",
  Software = "software",
  Tool = "tool",
  Controller = "controller",
}

const state = reactive({
  isLoading: true,
  list: [
    {
      title: "Hardware",
      context: VersionType.Firmware,
    },
    {
      title: "Software",
      context: VersionType.Software,
    },
    {
      title: "Tool",
      context: VersionType.Tool,
    },
    {
      title: "Controlbox",
      context: VersionType.Controller,
    },
  ],
});

onMounted(() => {
  service.addEventListener(FuncType.Msg, (e) => {
    if (hasInfo(e)) {
      state.isLoading = false;
    }
  });
});
</script>
