<script setup lang="ts"></script>
<template>
  <div
    class="w-screen h-screen flex justify-center items-center bg-primary-light dark:bg-primary-dark"
  >
    <div
      class="xs:w-full md:w-3/12 bg-secondary-light dark:bg-secondary-dark rounded-md shadow-md xs:m-6 md:m-3 p-3"
    >
      <h1
        class="text-xl text-center mb-4 text-primary-dark dark:text-primary-light"
      >
        Login to Admin
      </h1>
      <input
        type="text"
        class="w-full my-2 h-12 border-2 rounded-md pl-2 mb-4"
        placeholder="username"
      />
      <input
        type="text"
        class="w-full my-2 h-12 border-2 rounded-md pl-2 mb-4"
        placeholder="password"
      />
      <button
        class="w-full bg-purple-500 dark:bg-purple-900 rounded-md py-2 text-white mt-4 mb-2"
      >
        Login
      </button>
    </div>
  </div>
</template>

<style></style>
