<script setup lang="ts">
import { defineProps, reactive } from "vue";
import { useRoute } from "vue-router";
const props = defineProps({
  isMenu: {
    require: true,
    type: Boolean,
  },
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

const route = useRoute();
</script>

<template>
  <div
    class="xs:absolute md:static h-screen bg-blue-900 text-white transition-all duration-500 ease-in-out transform"
    :class="
      props.isMenu
        ? 'xs:translate-x-0 xs:w-7/12 sm:w-5/12 md:w-4/12 lg:w-3/12 xl:w-2/12'
        : 'xs:-translate-x-52 w-0'
    "
  >
    <div class="flex justify-between items-center p-4 bg-blue-800">
      <div>Admin</div>
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
    <ul class="p-4 text-sm font-light text-gray-300">
      <li
        v-for="(item, index) in listMenu"
        :key="index"
        class="mb-2"
        :class="route.name === item.name ? 'text-white font-semibold' : ''"
      >
        <router-link :to="{ name: item.name }">
          {{ item.text }}
        </router-link>
      </li>
      <li class="cursor-pointer">Logout</li>
    </ul>
  </div>
</template>
