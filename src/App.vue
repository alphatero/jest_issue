<template>
  <div
    class="flex h-screen"
    :class="{
      'theme-kemp': theme === 'kemp',
      'theme-hr': theme === 'hr',
      'theme-lucent': theme === 'lucent',
    }"
  >
    <Sidebar />
    <div class="flex w-full flex-1 flex-col bg-gray-50">
      <Navbar />

      <main class="h-full overflow-y-auto bg-gray-100">
        <div class="container mx-auto grid px-6 py-6">
          <router-view> </router-view>
        </div>
      </main>
    </div>
  </div>
  <!-- Logout Modal -->
  <Modal class="py-6" :open="isLogout" @close="afterLogout">
    <h5 class="bg-gray-100 py-6 text-center text-xl">
      {{ $t("LogoutComplete") }}
    </h5>
    <div class="flex justify-end bg-white py-2 px-4">
      <DarkBtn
        class="rounded-md bg-gray-600 px-4 py-2 text-white"
        @click.prevent="afterLogout"
      >
        {{ $t("Close") }}
      </DarkBtn>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";
import Navbar from "./components/Navbar.vue";
import Modal from "./components/Modal.vue";
import { useLanguage } from "./store/monitor";
import { usePassword } from "./store/Login";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

console.log(import.meta.env);

const { locale } = useI18n({});

onMounted(() => {
  console.log(locale.value);
});

const router = useRouter();

const theme = ref(import.meta.env.VITE_APP_THEME);

const isLogout = ref(false);

const { language } = useLanguage();
const { password } = usePassword();

function changePath() {
  const link = window.location.pathname;
  const word = "correction";
  if (link.includes(word)) {
    console.log("include");
    router.replace("/correction").catch();
  }
}

function checkLogout() {
  isLogout.value = true;
  const isLogin = 0;
  password.value.isLogin = isLogin;
  sessionStorage.setItem("isLogin", JSON.stringify(isLogin));
}

function afterLogout() {
  isLogout.value = false;
  router.replace("/").catch();
}

function checkLang() {
  if (language.value.val === 0) {
    locale.value = "ch";
  } else if (language.value.val === 1) {
    locale.value = "cn";
  } else if (language.value.val === 2) {
    locale.value = "en";
  } else if (language.value.val === 3) {
    locale.value = "jp";
  }
  console.log(`lang: ${locale.value}`);
  language.value.val = null ;
}

checkLang();

onMounted(() => {
  checkLang();
  changePath();
  console.log(sessionStorage.getItem("isLogin"));
});

watch(
  () => password.value.isLogin,
  () => {
    if (password.value.isLogin === 6) {
      checkLogout();
    }
  }
);
watch(
  () => language.value.val,
  () => {
    checkLang();
  }
);
</script>
