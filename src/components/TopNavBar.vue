<script setup lang="ts">
defineProps<{
  isDarkMode: boolean;
}>();

defineEmits<{
  (e: "toggle-dark-mode"): void;
  (e: "toggle-mobile-menu"): void;
}>();
</script>

<template>
  <header
    class="bg-white dark:bg-gray-800 shadow transition-colors duration-300"
  >
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center relative"
    >
      <div class="flex items-center">
        <!-- Mobile menu button -->
        <button
          @click="$emit('toggle-mobile-menu')"
          class="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <span class="sr-only">Open main menu</span>
          <!-- Heroicon name: outline/menu -->
          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <img
          src="@/assets/img/logo.png"
          alt="Propietas"
          class="h-12 w-auto ml-2 lg:ml-0"
        />
      </div>
      <h1
        class="absolute left-1/2 transform -translate-x-1/2 text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white"
      >
        Manual Créditos Hipotecarios - 2024
      </h1>
      <div class="flex items-center ml-auto pr-4">
        <img
          src="@/assets/img/bch.svg"
          alt="Banco del Chubut"
          class="h-12 w-auto sm:h-12 mr-2"
        />
        <button
          @click="$emit('toggle-dark-mode')"
          class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          <svg
            v-if="isDarkMode"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>
