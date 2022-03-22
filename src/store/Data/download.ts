/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasDownload, Download } from "../../model/Data";

const download = reactive({
  fileName: "",
  status: 0,
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasDownload(msg)) {
    Object.assign(download, Download(msg));
  }
});

export function useDownload() {
  const downloadRef = ref(download);

  watch(
    () => download,
    (downloadValue) => (downloadRef.value = downloadValue)
  );

  return { download: downloadRef };
}

export default download;
