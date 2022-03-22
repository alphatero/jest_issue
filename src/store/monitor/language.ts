/* eslint-disable no-return-assign */
import { reactive, ref, watch } from "vue";
import Service, { FuncType } from "../../websocket";
import { hasLanguage, Language } from "../../model/view";

const language = reactive({
  val: 0 || null,
});

Service(window.ip).addEventListener(FuncType.Msg, (msg) => {
  if (hasLanguage(msg)) {
    Object.assign(language, Language(msg));
  }
});

export function useLanguage() {
  const languageRef = ref(language);

  watch(
    () => language,
    (languageValue) => (languageRef.value = languageValue)
  );

  return { language: languageRef };
}

export default language;
