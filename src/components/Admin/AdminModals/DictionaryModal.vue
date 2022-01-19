<script setup lang="ts">
import { ref, reactive, defineProps, defineEmits, PropType } from "vue";
import Modal from "@/components/Modal/Modal.vue";
import { useDictionary } from "@/composables/useDictionary";
import {
  IAddDictionaryPayload,
  IUpdateDictionaryPayload,
} from "@/types/payload";
import { IResponseStatus } from "@/types/response";
import Toast from "@/components/Toast/Toast.vue";

const props = defineProps({
  show: {
    required: true,
    type: Boolean as PropType<boolean>,
  },
});

const emits = defineEmits(["onShowChange"]);

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

const _id = ref<string>("");
const jaksel = ref<string>("");
const arti = ref<string>("");

const { addDictionary, updateDictionary } = useDictionary();

const handleDictionary = async () => {
  isLoading.value = true;
  const { status, message }: IResponseStatus =
    _id.value !== "" ? await handleUpdateProcess() : await handeAddProcess();

  toast.type = status ? "success" : "error";
  toast.msg = message;
  toast.show = true;

  setTimeout(() => {
    emits("onShowChange", false);
    isLoading.value = false;
  }, 1000);
};

const handeAddProcess = async () => {
  const payloadData: IAddDictionaryPayload = {
    jaksel: jaksel.value,
    artinya: arti.value,
  };

  const { status, message }: IResponseStatus = await addDictionary(payloadData);

  return {
    status,
    message,
  };
};

const handleUpdateProcess = async () => {
  const payloadData: IUpdateDictionaryPayload = {
    params: {
      _id: _id.value,
    },
    payload: {
      jaksel: jaksel.value,
      artinya: arti.value,
    },
  };

  const { status, message }: IResponseStatus = await updateDictionary(
    payloadData
  );

  return {
    status,
    message,
  };
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
    :show="props.show"
    title="Tambah kosa kata"
    :is-loading="isLoading"
    :text-submit="_id !== '' ? 'Perbaharui' : 'Tambahkan'"
    @on-closed="$emit('onShowChange', false)"
    @on-canceled="$emit('onShowChange', false)"
    @on-confirmed="handleDictionary"
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
</template>
