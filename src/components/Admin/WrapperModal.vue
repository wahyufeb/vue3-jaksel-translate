<script setup lang="ts">
import Modal from "./Modal.vue";
const loremTxt =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque expedita debitis nam qui, sequi molestias eum laudantium eligendi ducimus? Cupiditate placeat odio consequuntur a sit quidem ducimus perspiciatis repellendus illo?";
</script>
<template>
  <h3>Implementasi Teleport</h3>
  <div id="modal-data"></div>
  <Modal :text="loremTxt" />
</template>
