<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import {
  HomeIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
  BuildingOfficeIcon,
  CalculatorIcon,
  InformationCircleIcon,
  Cog6ToothIcon,
  MapIcon,
} from "@heroicons/vue/24/outline";

const route = useRoute();

defineEmits<{
  (e: "close-mobile-menu"): void;
}>();

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
  { name: "Clientes", path: "/clientes", icon: UsersIcon },
  { name: "Beneficiarios", path: "/beneficiarios", icon: UsersIcon },
  {
    name: "Condiciones del Préstamo",
    path: "/condiciones-prestamo",
    icon: CurrencyDollarIcon,
  },
  {
    name: "Requisitos",
    path: "/requisitos",
    icon: ClipboardDocumentListIcon,
  },
  {
    name: "Finalidad del Préstamo",
    path: "/finalidad-prestamo",
    icon: BuildingOfficeIcon,
  },
  { name: "Simulador", path: "/simulacion", icon: CalculatorIcon },
  { name: "Propiedades", path: "/mapa-propiedades", icon: BuildingOfficeIcon }, // Cambiar el nombre y la ruta
  { name: "Acerca de", path: "/acerca-de", icon: InformationCircleIcon },
];
</script>

<template>
  <nav
    class="h-full py-5 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300 flex flex-col w-40"
  >
    <div class="flex-1 px-4 overflow-y-auto">
      <RouterLink
        v-for="(item, index) in menuItems"
        :key="index"
        :to="item.path"
        class="flex flex-col items-center justify-center px-2 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-indigo-500 hover:text-white mb-3 transition-colors duration-200 shadow-md"
        :class="{
          'bg-indigo-500 text-white': route.path === item.path,
        }"
        @click="$emit('close-mobile-menu')"
      >
        <component :is="item.icon" class="h-6 w-6 mb-1" />
        <span class="text-xs font-medium text-center">{{ item.name }}</span>
      </RouterLink>
    </div>
    <div class="px-4 mt-auto">
      <div class="border-t border-gray-200 dark:border-gray-700 my-4"></div>
      <RouterLink
        to="/configuracion"
        class="flex flex-col items-center justify-center px-2 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-indigo-500 hover:text-white transition-colors duration-200 shadow-md"
        :class="{
          'bg-indigo-500 text-white': route.path === '/configuracion',
        }"
        @click="$emit('close-mobile-menu')"
      >
        <Cog6ToothIcon class="h-6 w-6 mb-1" />
        <span class="text-xs font-medium text-center">Configuración</span>
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.router-link-active {
  @apply bg-indigo-500 text-white;
}
</style>
