<script setup lang="ts">
import { ref, defineProps } from "vue";
const isOpen = ref(false);

defineProps({
  text: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <button @click="isOpen = true">Open Modal {{ isOpen }}</button>
  <teleport to="#modal-data">
    <div v-if="isOpen" class="modal">
      <div class="modal__content">
        <div class="modal__content__header">
          <h1>Title</h1>
          <button @click="isOpen = false">Close</button>
        </div>
        <div class="modal__content__body">
          {{ text }}
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.modal {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  height: auto;
  min-height: 100vh;
}

.modal__content {
  width: 500px;
  height: 500px;
  padding: 20px;
  background-color: #fafafa;
  border-radius: 5px;
}

.modal__content__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal__content__header button {
  height: 40px;
  width: 50px;
  text-align: center;
  border-radius: 10px;
}
</style>
