<template>
  <Loading :isLoading="isLoading" />
  <div class="flex flex-col items-center gap-4" ref="test">
    <!-- Ip view -->
    <Card :title="'IP'" class="w-full lg:w-3/5">
      <div class="flex justify-center py-10 px-6 text-2xl text-gray-600">
        <h3>{{ ip.addr }}</h3>
      </div>
    </Card>
    <!-- Ip set -->
    <Card :title="$t('IPset')" class="w-full lg:w-3/5">
      <div
        class="flex flex-col justify-center gap-4 py-10 px-6 text-xl text-gray-400 md:text-2xl"
      >
        <form
          class="flex flex-col justify-center gap-2 px-5 md:flex-row"
          @submit.prevent="submitIp()"
        >
          <div class="flex space-x-2">
            <IpsetInput
              v-model="ip['ip' + index]"
              v-for="index in 4"
              :ref="`IpsetInputRef${index}`"
              :index="index"
              :key="index"
            />
          </div>
          <Btn type="submit">{{ $t("Confirm") }}</Btn>
        </form>
      </div>
    </Card>
    <Modal :title="$t('SetModal')" :open="setIpOver" :noclose="true">
      <div class="flex justify-center bg-gray-100 py-8">
        <h5 class="text-xl">{{ $t("UpdateAlert") }}</h5>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, VNode } from "vue";
import Service, { FuncType } from "../websocket";
import { useIp } from "../store/monitor";
import { validateIpSet } from "../utils";
import IpsetInput from "../components/IpsetInput.vue";
import { Msg } from "../types";

const IpsetInputRef1 = ref<any>(null);
const IpsetInputRef2 = ref<any>(null);
const IpsetInputRef3 = ref<any>(null);
const IpsetInputRef4 = ref<any>(null);

const test = ref(null);
const { ip } = useIp();

enum Ip {
  Title = "ip",
}

type IpType = {
  [key: string]: string;
};

const service = Service(window.ip);

function hasIp(e: Msg) {
  return "ip1" in e;
}

const isLoading = ref(true);
const setIpOver = ref(false);
const error = ref(false);

onMounted(() => {
  console.log("ref", IpsetInputRef1.value);

  service.addEventListener(FuncType.Msg, (e) => {
    if (hasIp(e)) {
      isLoading.value = false;
    }
    if ("setIpOk" in e && e.setIpOk === 1) {
      isLoading.value = false;
      setIpOver.value = true;
    }
  });
});

const submitIp = () => {
  const validate = validateIpSet(
    ip.value.ip1,
    ip.value.ip2,
    ip.value.ip3,
    ip.value.ip4
  );
  if (!validate) error.value = true;
  if (!validate) return;
  const sendIp = JSON.stringify({
    setIpOk: 0,
    ip1: Number(ip.value.ip1),
    ip2: Number(ip.value.ip2),
    ip3: Number(ip.value.ip3),
    ip4: Number(ip.value.ip4),
  });
  console.log(sendIp);
  service.send(sendIp);
  isLoading.value = true;
};

watch(
  () => ip.value.ip1,
  () => {
    if (ip.value.ip1.length >= 3) {
      ip.value.ip2 = ip.value.ip1.substring(3);
      ip.value.ip1 = ip.value.ip1.substring(0, 3);
      IpsetInputRef2.value.dom.focus();
    }
  }
);
watch(
  () => ip.value.ip2,
  () => {
    if (ip.value.ip2.length >= 3) {
      ip.value.ip3 = ip.value.ip2.substring(3);
      ip.value.ip2 = ip.value.ip2.substring(0, 3);
      IpsetInputRef3.value.dom.focus();
    }
    if (ip.value.ip2.length === 0 && ip.value.ip1.length > 0) {
      IpsetInputRef1.value.dom.focus();
    }
  }
);
watch(
  () => ip.value.ip3,
  () => {
    if (ip.value.ip3.length >= 3) {
      ip.value.ip4 = ip.value.ip3.substring(3);
      ip.value.ip3 = ip.value.ip3.substring(0, 3);
      IpsetInputRef4.value?.dom.focus();
    }
    if (ip.value.ip3.length === 0 && ip.value.ip2.length > 0) {
      IpsetInputRef2.value?.dom.focus();
    }
  }
);
watch(
  () => ip.value.ip4,
  () => {
    if (ip.value.ip4.length === 0 && ip.value.ip3.length > 0) {
      IpsetInputRef3.value?.dom.focus();
    }
  }
);
</script>
