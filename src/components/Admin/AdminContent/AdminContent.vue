<script setup lang="ts">
import AdminTable from "../AdminTable/AdminTable.vue";
import WrapperModal from "../WrapperModal.vue";
import { defineProps, reactive } from "vue";
import { Iitem } from "@/types/item";
import { IHeadersTable } from "@/types/table";

const props = defineProps({
  isMenu: {
    require: true,
    type: Boolean,
  },
});

const items = reactive<Iitem[]>([
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

const headers = reactive<IHeadersTable[]>([
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
  <div class="w-full p-4 h-screen">
    <img
      class="cursor-pointer"
      src="@/assets/icons/menu-black.png"
      width="20"
      alt="menu icon"
      @click="$emit('menuClicked', props.isMenu)"
    />
    <AdminTable :items="items" :headers="headers" />
    <WrapperModal />
  </div>
</template>
