<template>
  <div class="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
    <div
      class="relative p-8 bg-white dark:bg-gray-800 w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg"
    >
      <button @click="$emit('close')" class="absolute top-0 right-0 mt-4 mr-4">
        <svg
          class="h-6 w-6 text-gray-700 dark:text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Editar propiedad
      </h2>
      <PropiedadForm
        :initialProperty="property"
        @propiedad-updated="handlePropertyUpdated"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PropiedadForm from "@/components/PropiedadForm.vue";

defineProps({
  property: Object,
});

const handlePropertyUpdated = () => {
  $emit("propiedad-updated");
  $emit("close");
};
</script>

<style scoped>
.bg-smoke-light {
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
}
</style>
