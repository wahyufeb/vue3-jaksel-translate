<script setup lang="ts">
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
  <div class="w-screen h-auto flex justify-center items-center mt-40 p-8">
    <div class="xs:w-full md:w-8/12 bg-white rounded-md">
      <div class="flex justify-evenly py-2 mb-4 options">
        <div class="uppercase">{{ from }}</div>
        <button
          class="hover:bg-gray-100 rounded-full p-1"
          @click="handleSwitch"
        >
          <img src="@/assets/icons/swap.png" alt="icon swap" width="25" />
        </button>
        <div class="uppercase">{{ to }}</div>
      </div>
      <div class="p-4 flex xs:flex-col md:flex-row justify-between gap-10">
        <textarea
          rows="5"
          class="xs:w-full md:w-6/12 bg-gray-50 p-2 rounded-md text-2xl resize-none"
          v-model="fromInput"
        >
        </textarea>
        <textarea
          rows="5"
          class="xs:w-full md:w-6/12 bg-gray-50 p-2 rounded-md text-2xl resize-none"
          :class="disabled ? 'bg-gray-100' : ''"
          v-model="toInput"
          :disabled="disabled"
        >
        </textarea>
      </div>
    </div>
  </div>
</template>

<style scoped>
.options {
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.3);
}
</style>
