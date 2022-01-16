<script setup lang="ts">
import { reactive, ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import Toast from "@/components/Toast/Toast.vue";
import Loader from "@/components/Loader/Loader.vue";
import { ILoginPayload } from "@/types/payload";
import { IResponseStatus } from "@/types/response";
import { useRouter } from "vue-router";
const auth = useAuth();
const router = useRouter();

const email = ref<string>("");
const password = ref<string>("");
const loading = ref<boolean>(false);
const toast = reactive<{
  show: boolean;
  type: string;
  msg: string;
}>({
  show: false,
  type: "",
  msg: "",
});

const handleLogin = async (): Promise<void> => {
  loading.value = true;

  const payloadData: ILoginPayload = {
    email: email.value,
    password: password.value,
  };

  const { status, message }: IResponseStatus = await auth.loginProcess(
    payloadData
  );

  toast.type = status ? "success" : "error";
  toast.msg = message;
  toast.show = true;

  setTimeout(() => {
    if (status) {
      loading.value = false;
      router.push({ name: "AdminDashboard" });
    }
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
  <div
    class="w-screen h-screen flex justify-center items-center bg-primary-light dark:bg-primary-dark"
  >
    <div
      class="xs:w-full md:w-3/12 bg-secondary-light dark:bg-secondary-dark rounded-md shadow-md xs:m-6 md:m-3 p-6"
    >
      <h1
        class="text-xl text-center mb-4 text-primary-dark dark:text-primary-light"
      >
        Login to Admin
      </h1>
      <form @submit.prevent="handleLogin">
        <input
          type="email"
          class="w-full my-2 h-12 border-2 rounded-md pl-2 mb-4"
          placeholder="email"
          v-model="email"
        />
        <input
          type="text"
          class="w-full my-2 h-12 border-2 rounded-md pl-2 mb-4"
          placeholder="password"
          v-model="password"
        />
        <button
          class="w-full bg-purple-500 dark:bg-purple-900 rounded-md py-2 text-white mt-4 mb-2 flex justify-center items-center"
        >
          <Loader v-if="loading" />
          <div v-else>Login</div>
        </button>
      </form>
    </div>
  </div>
</template>

<style></style>
