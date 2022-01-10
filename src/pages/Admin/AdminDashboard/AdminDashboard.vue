<script setup lang="ts">
import { ref } from "vue";
import AdminNavbar from "@/components/Admin/AdminNavbar/AdminNavbar.vue";
import AdminContent from "@/components/Admin/AdminContent/AdminContent.vue";

const isMenu = ref<boolean>(true);

const handleTest = (val: boolean) => {
  isMenu.value = !val;
};
</script>

<template>
  <div class="flex xs:relative md:static">
    <AdminNavbar :isMenu="isMenu" @menuClicked="handleTest" />
    <AdminContent :isMenu="isMenu" @menuClicked="handleTest" />
  </div>
</template>

<style scoped></style>
