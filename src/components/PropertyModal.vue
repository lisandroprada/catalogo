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
        {{ property?.titulo }}
      </h2>
      <Carousel
        v-if="property?.imagenes_urls && property.imagenes_urls.length"
        :autoplay="2000"
        :wrap-around="true"
        :mouse-drag="true"
        :touch-drag="true"
        :keyboard-navigation="true"
      >
        <Slide v-if="property.imagen_portada_url" :key="'portada'">
          <img
            :src="`http://localhost:3002/${property.imagen_portada_url}`"
            class="w-full h-48 object-cover"
          />
        </Slide>
        <Slide v-for="(img, index) in property.imagenes_urls" :key="index">
          <img
            :src="`http://localhost:3002/${img}`"
            class="w-full h-48 object-cover"
          />
        </Slide>

        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
      <img
        v-else-if="property?.imagen_portada_url"
        :src="`http://localhost:3002/${property.imagen_portada_url}`"
        :alt="property.titulo"
        class="w-full h-48 object-cover mb-4"
      />
      <p class="text-gray-900 dark:text-gray-100">
        <strong>Tipo:</strong> {{ property?.tipo }}
      </p>
      <p class="text-gray-900 dark:text-gray-100">
        <strong>Descripción:</strong> {{ property?.descripcion }}
      </p>
      <p class="text-gray-900 dark:text-gray-100">
        <strong>Precio:</strong> ${{ property?.precio }}
      </p>
      <p class="text-gray-900 dark:text-gray-100">
        <strong>Dirección:</strong> {{ property?.direccion }}
      </p>
      <p class="text-gray-900 dark:text-gray-100">
        <strong>Propietario:</strong> {{ property?.propietario }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

defineProps({
  property: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.bg-smoke-light {
  background-color: rgba(0, 0, 0, 0.5);
}

.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
