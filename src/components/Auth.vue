<template>
  <div v-if="password.isLogin !== 0">
    <li class="px-6 py-3">
      <p v-if="password.isLogin === 1" class="text-green-600">
        {{ $t("Master") }}
      </p>
      <p v-else-if="password.isLogin === 2" class="text-green-600">
        {{ $t("Manager_1") }}
      </p>
      <p v-else-if="password.isLogin === 3" class="text-green-600">
        {{ $t("Manager_2") }}
      </p>
    </li>
    <li class="px-6 py-3">
      <button
        class="rounded-md border border-gray-500 px-3 py-1 transition duration-500 ease-in-out hover:bg-gray-500 hover:text-white"
        @click.prevent="toLogOut"
      >
        {{ $t("Logout") }}
      </button>
    </li>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, onMounted } from "vue";
import { usePassword } from "../store/Login";

const { password } = usePassword();

console.log(password.value);

const emit = defineEmits(["close"]);

const toLogOut = () => {
  emit("close");
  const isLogin = 6;
  sessionStorage.setItem("isLogin", JSON.stringify(isLogin));
  password.value.isLogin = isLogin;
};

onMounted(() => {
  password.value.isLogin = Number(sessionStorage.getItem("isLogin"));
});
</script>
