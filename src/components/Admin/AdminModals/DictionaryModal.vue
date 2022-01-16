<script setup lang="ts">
import { ref } from "vue";
import Modal from "@/components/Modal/Modal.vue";

const show = ref<boolean>(true);
const jaksel = ref<string>("");
const arti = ref<string>("");
</script>

<template>
  <Modal
    :show="show"
    title="Tambah kosa kata"
    @on-closed="show = false"
    @on-canceled="show = false"
  >
    <template #default>
      <input
        type="email"
        class="w-full my-2 h-12 border-2 rounded-md pl-2 mb-4"
        placeholder="email"
        v-model="jaksel"
      />
      <input
        type="text"
        class="w-full my-2 h-12 border-2 rounded-md pl-2 mb-4"
        placeholder="password"
        v-model="arti"
      />
    </template>
  </Modal>
</template>
