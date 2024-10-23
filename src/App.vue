<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
import SideMenu from "./components/SideMenu.vue";
import TopNavBar from "./components/TopNavBar.vue";
import Footer from "./components/Footer.vue";
import { useDarkMode } from "./composables/useDarkMode";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const { isDarkMode, toggleDarkMode } = useDarkMode();
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<template>
  <div
    :class="{ dark: isDarkMode }"
    class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 flex flex-col"
  >
    <TopNavBar
      class="bg-white dark:bg-gray-800 shadow sticky top-0 z-10"
      :isDarkMode="isDarkMode"
      @toggle-dark-mode="toggleDarkMode"
      @toggle-mobile-menu="toggleMobileMenu"
    />
    <div class="flex flex-1 overflow-hidden">
      <!-- Mobile menu (off-canvas) -->
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 flex z-40 lg:hidden"
        @click.self="toggleMobileMenu"
      >
        <div
          class="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800 shadow-xl"
        >
          <div class="absolute top-0 right-0 -mr-12 pt-2">
            <button
              @click="toggleMobileMenu"
              class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span class="sr-only">Close sidebar</span>
              <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
          <SideMenu @close-mobile-menu="toggleMobileMenu" />
        </div>
      </div>

      <!-- Static sidebar for desktop -->
      <div class="hidden lg:flex lg:flex-shrink-0">
        <div class="flex flex-col w-40">
          <SideMenu />
        </div>
      </div>

      <div class="flex-1 flex flex-col overflow-hidden">
        <main
          class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 dark:bg-gray-800 p-6 transition-colors duration-300"
        >
          <RouterView />
        </main>
      </div>
    </div>
    <Footer class="bg-white dark:bg-gray-800 shadow" />
  </div>
</template>

<style>
body {
  @apply overflow-hidden; /* Prevent body scrolling */
}

#app {
  @apply h-screen flex flex-col;
}

main {
  @apply flex-1 overflow-auto;
}
</style>
