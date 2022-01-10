<script setup lang="ts">
import { getCurrentTheme } from "@/composables/useThemeSwitcher";
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
