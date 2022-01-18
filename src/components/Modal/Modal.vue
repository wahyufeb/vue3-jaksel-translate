<script setup lang="ts">
import { defineProps, defineEmits, PropType } from "vue";
import Loader from "../Loader/Loader.vue";
defineEmits(["onCanceled", "onClosed", "onConfirmed"]);
const props = defineProps({
  show: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
  title: {
    type: String as PropType<string>,
    required: true,
  },
  textSubmit: {
    type: String as PropType<string>,
    required: false,
    default: "Confirm",
  },
  isLoading: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
});
</script>
<template>
  <div
    v-if="props.show"
    class="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster"
    style="background: rgba(0, 0, 0, 0.7)"
  >
    <div
      class="border border-teal-500 modal-container bg-white w-11/12 md:max-w-md mx-auto rounded z-50 overflow-y-auto"
    >
      <div class="modal-content py-4 text-left px-6">
        <!--Title-->
        <div class="flex justify-between items-center pb-3">
          <p class="text-2xl font-bold text-secondary-dark">
            {{ props.title }}
          </p>
          <div
            class="modal-close cursor-pointer z-50"
            @click="$emit('onClosed')"
          >
            <svg
              class="fill-current text-black"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
              ></path>
            </svg>
          </div>
        </div>
        <!--Body-->
        <div class="my-5 text-secondary-dark">
          <slot />
        </div>
        <!--Footer-->
        <div class="flex justify-end pt-2">
          <button
            class="focus:outline-none modal-close px-4 bg-gray-200 p-3 rounded-lg text-black hover:bg-gray-300"
            @click="$emit('onCanceled')"
          >
            Cancel
          </button>
          <button
            class="focus:outline-none px-4 bg-purple-700 p-3 ml-3 rounded-lg text-secondary-light hover:bg-teal-400 flex justify-center items-center"
            @click="$emit('onConfirmed')"
          >
            <Loader v-if="isLoading" />
            {{ textSubmit }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
