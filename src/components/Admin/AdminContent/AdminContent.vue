<script setup lang="ts">
import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher.vue";
import { getCurrentTheme } from "@/composables/useThemeSwitcher";
import AdminTable from "../AdminTable/AdminTable.vue";
import WrapperModal from "../WrapperModal.vue";
import { defineProps, reactive } from "vue";
import { Item } from "@/types/item";
import { HeadersTable } from "@/types/table";

const props = defineProps({
  isMenu: {
    require: true,
    type: Boolean,
  },
});

const items = reactive<Item[]>([
  {
    id: 1,
    bahasa_jaksel: "A",
    arti: "A",
  },
  {
    id: 2,
    bahasa_jaksel: "B",
    arti: "B",
  },
  {
    id: 3,
    bahasa_jaksel: "C",
    arti: "C",
  },
  {
    id: 4,
    bahasa_jaksel: "D",
    arti: "D",
  },
  {
    id: 5,
    bahasa_jaksel: "E",
    arti: "E",
  },
]);

const headers = reactive<HeadersTable[]>([
  {
    title: "No",
    class: "",
  },
  {
    title: "Bahasa Jaksel",
    class: "",
  },
  {
    title: "Arti",
    class: "",
  },
  {
    title: "Action",
    class: "",
  },
]);
</script>

<template>
  <div
    class="w-full p-4 h-screen bg-secondary-light text-secondary-dark dark:bg-secondary-dark dark:text-secondary-light"
  >
    <div class="flex justify-between">
      <img
        class="cursor-pointer"
        :src="
          getCurrentTheme === 'dark'
            ? require('@/assets/icons/menu-white.png')
            : require('@/assets/icons/menu-black.png')
        "
        width="20"
        alt="menu icon"
        @click="$emit('menuClicked', props.isMenu)"
      />
      <ThemeSwitcher :theme="getCurrentTheme" />
    </div>
    <AdminTable :items="items" :headers="headers" />
    <WrapperModal />
  </div>
</template>
