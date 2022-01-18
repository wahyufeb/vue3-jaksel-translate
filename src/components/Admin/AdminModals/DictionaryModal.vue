<script setup lang="ts">
import { ref, reactive } from "vue";
import Modal from "@/components/Modal/Modal.vue";
import { useDictionary } from "@/composables/useDictionary";
import { IAddDictionaryPayload } from "@/types/payload";
import { IResponseStatus } from "@/types/response";
import Toast from "@/components/Toast/Toast.vue";

const show = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const toast = reactive<{
  show: boolean;
  type: string;
  msg: string;
}>({
  show: false,
  type: "",
  msg: "",
});
const jaksel = ref<string>("");
const arti = ref<string>("");

const { addDictionary } = useDictionary();

const handleAddDictionary = async () => {
  isLoading.value = true;
  const payloadData: IAddDictionaryPayload = {
    jaksel: jaksel.value,
    artinya: arti.value,
  };

  const { status, message }: IResponseStatus = await addDictionary(payloadData);

  toast.type = status ? "success" : "error";
  toast.msg = message;
  toast.show = true;

  setTimeout(() => {
    isLoading.value = false;
    show.value = false;
  }, 1000);
};
</script>

<template>
  <Toast
    :msg="toast.msg"
    :type="toast.type"
    :show="toast.show"
    @on-finished="toast.show = false"
  />
  <Modal
    :show="show"
    title="Tambah kosa kata"
    :is-loading="isLoading"
    text-submit="Tambahkan"
    @on-closed="show = false"
    @on-canceled="show = false"
    @on-confirmed="handleAddDictionary"
  >
    <template #default>
      <input
        type="text"
        class="w-full my-2 h-12 border-2 rounded-md pl-2 mb-4"
        placeholder="bahasa Jaksel"
        v-model="jaksel"
      />
      <input
        type="text"
        class="w-full my-2 h-12 border-2 rounded-md pl-2 mb-4"
        placeholder="artinya"
        v-model="arti"
      />
    </template>
  </Modal>
  <div class="flex justify-end items-center">
    <button
      class="my-4 py-2 px-4 bg-purple-700 rounded-md text-base text-white"
      @click="show = true"
    >
      Tambah kosa kata
    </button>
  </div>
</template>
