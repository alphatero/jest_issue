<template>
  <div class="flex gap-4">
    <button
      class="rounded bg-gray-400 py-2 px-5 text-2xl text-white shadow hover:bg-gray-600"
      @click.prevent="$emit('update:importOver', true)"
    >
      {{ $t("ImportParameter") }}
    </button>
    <button
      class="rounded bg-gray-400 py-2 px-5 text-2xl text-white shadow hover:bg-gray-600"
      @click.prevent="exportParameter"
    >
      {{ $t("ExportParameter") }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  importOver: {
    type: Boolean,
    default: false,
  },
  exportObj: {
    type: Object,
  },
});

defineEmits(["update:importOver"]);

function exportParameter() {
  const exportObj = props.exportObj;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([JSON.stringify(exportObj)]));
  link.setAttribute("download", "parameter.json");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>
