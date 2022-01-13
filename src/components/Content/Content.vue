<script setup lang="ts">
import { getCurrentTheme } from "@/composables/useThemeSwitcher";
import { ref } from "vue";

const fromInput = ref<string>("");
const toInput = ref<string>("Terjemahan");

const disabled = ref<boolean>(true);
const from = ref<string>("jaksel");
const to = ref<string>("artinya");

const handleSwitch = () => {
  const temp = from.value;
  from.value = to.value;
  to.value = temp;
};
</script>

<template>
  <div class="w-screen flex justify-center items-center mt-40 p-8">
    <div
      class="xs:w-full md:w-8/12 bg-white dark:bg-secondary-dark rounded-md shadow-xl"
    >
      <div
        class="flex justify-evenly py-2 mb-4"
        :class="getCurrentTheme === 'dark' ? 'options-dark' : 'options'"
      >
        <div class="uppercase text-primary-dark dark:text-primary-light">
          {{ from }}
        </div>
        <button class="rounded-full p-1" @click="handleSwitch">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            :stroke="getCurrentTheme === 'dark' ? 'white' : 'black'"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
        </button>
        <div class="uppercase text-primary-dark dark:text-primary-light">
          {{ to }}
        </div>
      </div>
      <div
        class="py-4 px-6 flex xs:flex-col md:flex-row justify-between gap-10"
      >
        <textarea
          rows="5"
          class="xs:w-full md:w-6/12 dark:bg-ternary-dark dark:text-ternary-light bg-ternary-light text-ternary-dark p-2 rounded-md text-2xl resize-none mb-2"
          v-model="fromInput"
        >
        </textarea>
        <textarea
          rows="5"
          class="xs:w-full md:w-6/12 dark:bg-ternary-dark dark:text-ternary-light bg-ternary-light text-ternary-dark p-2 rounded-md text-2xl resize-none mb-2"
          :class="disabled ? 'bg-ternary-light' : ''"
          v-model="toInput"
          :disabled="disabled"
        >
        </textarea>
      </div>
    </div>
  </div>
</template>

<style scoped>
.options-dark {
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.6);
}

.options {
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.3);
}
</style>
