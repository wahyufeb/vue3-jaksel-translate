<script setup lang="ts">
import { getCurrentTheme } from "@/composables/useThemeSwitcher";
import { onMounted } from "vue";
import { loginProces } from "@/composables/useAuth";
import { ILoginPayload } from "@/types/payload";

onMounted(async () => {
  const payload: ILoginPayload = {
    email: "june321@gmail.com",
    password: "adminadmin",
  };
  const testReq = await loginProces(payload);
  console.warn(testReq);
});
</script>

<template>
  <div :class="getCurrentTheme">
    <router-view />
  </div>
</template>

<style>
.fade-enter-active {
  animation: coming 0.4s;
  animation-delay: 0.2s;
  opacity: 0;
}

.fade-leave-active {
  animation: going 0.4s;
}
</style>
