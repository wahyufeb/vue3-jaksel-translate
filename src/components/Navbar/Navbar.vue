<script setup lang="ts">
import { getCurrentTheme } from "@/composables/useThemeSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher.vue";
</script>
<template>
  <div
    class="flex justify-between py-4 px-8 bg-secondary-light dark:bg-secondary-dark shadow-sm border-b text-white"
  >
    <div class="flex">
      <!-- <div class="mr-2">Icon</div> -->
      <div class="font-bold">
        <span class="text-yellow-500">J</span>
        <span class="text-yellow-600">A</span>
        <span class="text-green-500">K</span>
        <span class="text-blue-500">S</span>
        <span class="text-red-500">E</span>
        <span class="text-purple-500">L</span>
        <span class="ml-1 dark:text-primary-light text-primary-dark"
          >TRANSLATE</span
        >
      </div>
    </div>
    <div class="flex">
      <ThemeSwitcher
        :theme="getCurrentTheme"
        class="ml-8 bg-primary-light dark:bg-ternary-dark px-3 py-2 shadow-sm rounded-xl cursor-pointer"
      />
    </div>
  </div>
</template>

<style scoped>
.border-b {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
