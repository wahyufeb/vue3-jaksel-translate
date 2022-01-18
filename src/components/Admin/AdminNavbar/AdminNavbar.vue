<script setup lang="ts">
import Cookies from "js-cookie";
import Toast from "@/components/Toast/Toast.vue";
import { defineProps, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const props = defineProps({
  isMenu: {
    required: true,
    type: Boolean,
  },
});

const toast = reactive<{
  show: boolean;
  type: string;
  msg: string;
}>({
  show: false,
  type: "",
  msg: "",
});

interface IlistMenu {
  name: string;
  text: string;
}

const listMenu = reactive<IlistMenu[]>([
  {
    name: "AdminDashboard",
    text: "Kamus Bahasa",
  },
]);

const logout = () => {
  Cookies.remove("token");
  if (!Cookies.get("token")) {
    toast.type = "success";
    toast.msg = "Sukses Logout";
  } else {
    toast.type = "error";
    toast.msg = "Gagal Logout";
  }
  toast.show = true;
  setTimeout(() => {
    window.location.reload();
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
    class="xs:absolute md:static h-screen bg-purple-900 dark:bg-primary-dark text-secondary-dark dark:text-secondary-light transition-all duration-500 ease-in-out transform"
    :class="
      props.isMenu
        ? 'xs:translate-x-0 xs:w-7/12 sm:w-5/12 md:w-4/12 lg:w-3/12 xl:w-2/12'
        : 'xs:-translate-x-52 w-0'
    "
  >
    <div
      class="flex justify-between items-center bg-purple-900 dark:bg-primary-dark p-4"
    >
      <div class="text-ternary-light dark:text-ternary-light">Admin</div>
      <div class="cursor-pointer">
        <img
          class="xs:block md:hidden"
          src="@/assets/icons/menu-white.png"
          width="20"
          alt="menu icon"
          @click="$emit('menuClicked', props.isMenu)"
        />
      </div>
    </div>
    <ul
      class="p-4 text-sm font-light text-ternary-light dark:text-ternary-light"
    >
      <li
        v-for="(item, index) in listMenu"
        :key="index"
        class="mb-2"
        :class="
          route.name === item.name
            ? 'text-secondary-ligth dark:text-secondary-light font-semibold'
            : ''
        "
      >
        <router-link :to="{ name: item.name }">
          {{ item.text }}
        </router-link>
      </li>
      <li class="cursor-pointer" @click="logout">Logout</li>
    </ul>
  </div>
</template>
