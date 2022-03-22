/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasFileList, FileList } from "../../model/Data";

const fileList = reactive({
  list: [],
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasFileList(msg)) {
    Object.assign(fileList, FileList(msg));
  }
});

export function usefileList() {
  const fileListRef = ref(fileList);

  watch(
    () => fileList,
    (fileListValue) => (fileListRef.value = fileListValue)
  );

  return { fileList: fileListRef };
}

export default fileList;
