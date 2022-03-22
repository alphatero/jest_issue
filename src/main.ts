import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import Card from "./components/Card.vue";
import Modal from "./components/Modal.vue";
import Loading from "./components/Loading.vue";
import Btn from "./components/Btn.vue";
import DarkBtn from "./components/DarkBtn.vue";
// import { makeServer } from "./mock/server";
// import checkPathMixin from "./utils/globalMethods";

import App from "./App.vue";
// import messages from '@intlify/vite-plugin-vue-i18n/messages'

import "./index.css";
import ch from "./locales/ch.json";
import en from "./locales/en.json";
import cn from "./locales/cn.json";
import jp from "./locales/jp.json";

import router from "./router";

if (process.env.NODE_ENV === "development") {
  // makeServer();
}

const i18n = createI18n({
  legacy: true,
  locale: localStorage.getItem("locale") || "ch",
  messages: {
    ch,
    en,
    cn,
    jp,
  },
});

const app = createApp(App);

app.use(router);
app.use(i18n);
// app.mixin(checkPathMixin);
app.component("Card", Card);
app.component("Modal", Modal);
app.component("Loading", Loading);
app.component("Btn", Btn);
app.component("DarkBtn", DarkBtn);

app.mount("#app");
