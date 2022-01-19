<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps({
  color: {
    type: String,
    required: false,
    default: "white",
  },
});
</script>
<template>
  <div
    class="w-6 h-6 loader border-2 border-white"
    :class="`border-${props.color}-500`"
  ></div>
</template>

<style scoped>
.loader {
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
