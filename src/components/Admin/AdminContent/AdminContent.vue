<script setup lang="ts">
import { onMounted } from "vue";
import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher.vue";
import { getCurrentTheme } from "@/composables/useThemeSwitcher";
import AdminTable from "../AdminTable/AdminTable.vue";
import { defineProps, reactive } from "vue";
import { HeadersTable } from "@/types/table";
import { useDictionary } from "@/composables/useDictionary";
import { IDictionary } from "@/types/dictionary";

const dictionary = useDictionary();
onMounted(async () => {
  await dictionary.loadDictionaries();
});

const props = defineProps({
  isMenu: {
    required: true,
    type: Boolean,
  },
});

const items = reactive<IDictionary[]>([
  {
    _id: "1",
    jaksel: "A",
    artinya: "A",
  },
  {
    _id: "2",
    jaksel: "B",
    artinya: "B",
  },
  {
    _id: "3",
    jaksel: "C",
    artinya: "C",
  },
  {
    _id: "4",
    jaksel: "D",
    artinya: "D",
  },
  {
    _id: "5",
    jaksel: "E",
    artinya: "E",
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
    <AdminTable
      v-if="dictionary.getDictionaries.length > 0"
      :items="dictionary.getDictionaries"
      :headers="headers"
    />
  </div>
</template>
