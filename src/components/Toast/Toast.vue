<script setup lang="ts">
import { defineProps, defineEmits, PropType, watch } from "vue";
const props = defineProps({
  show: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
  type: {
    type: String as PropType<string>,
    default: "info",
  },
  msg: {
    type: String as PropType<string>,
    required: true,
  },
});

const emits = defineEmits(["onFinished"]);

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      setTimeout(() => {
        emits("onFinished");
      }, 2000);
    }
  }
);
</script>
<template>
  <transition name="slide-fade">
    <div
      v-if="props.show"
      class="fixed top-4 right-4 transition text-white rounded-md px-5 py-4 cursor-pointer z-50"
      :class="{
        'bg-green-500 dark:bg-green-400 hover:bg-green-600':
          props.type === 'success',
        'bg-red-500 dark:bg-red-400 hover:bg-red-600': props.type === 'error',
        'bg-yellow-500 dark:bg-yellow-400 hover:bg-yellow-600':
          props.type === 'warning',
        'bg-blue-500 dark:bg-blue-400 hover:bg-blue-600': props.type === 'info',
      }"
    >
      <div class="flex items-center space-x-2">
        <svg
          v-if="props.type === 'success'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <svg
          v-if="props.type === 'error'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <svg
          v-if="props.type === 'warning'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>

        <svg
          v-if="props.type === 'info'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <p class="font-bold">{{ props.msg }}</p>
      </div>
    </div>
  </transition>
</template>
