<script setup lang="ts">
import { IDictionary } from "@/types/dictionary";
import { HeadersTable } from "@/types/table";
import { defineProps, PropType } from "vue";
import DictionaryModal from "../AdminModals/DictionaryModal.vue";
const props = defineProps({
  items: {
    required: true,
    type: Array as PropType<IDictionary[]>,
  },
  headers: {
    required: true,
    type: Array as PropType<HeadersTable[]>,
  },
});
</script>

<template>
  <DictionaryModal />
  <table class="table-auto w-full my-4">
    <thead class="text-xs font-semibold uppercase text-gray-400">
      <tr>
        <th
          v-for="(header, index) in props.headers"
          :key="index"
          class="p-2 whitespace-nowrap"
          :class="header.class"
        >
          <div class="font-semibold text-left">{{ header.title }}</div>
        </th>
      </tr>
    </thead>
    <tbody class="text-sm divide-y divide-gray-100">
      <tr v-for="(item, index) in items" :key="index">
        <td class="w-2/12 p-2 whitespace-nowrap">
          {{ index + 1 }}
        </td>
        <td class="w-4/12 p-2 whitespace-nowrap">
          <div class="flex items-center">
            {{ item.jaksel }}
          </div>
        </td>
        <td class="w-4/12 p-2 whitespace-nowrap">
          <div class="text-left">{{ item.artinya }}</div>
        </td>
        <td class="w-2/12 p-2 whitespace-nowrap">
          <div class="text-left flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 cursor-pointer p-1 hover:bg-blue-50 rounded-full mr-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 cursor-pointer p-1 hover:bg-red-50 rounded-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
