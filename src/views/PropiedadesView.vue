<template>
  <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
    <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-200">
      Lista de propiedades
    </h2>
    <button
      @click="openFormModal"
      class="mb-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Agregar Propiedad
    </button>
    <ul class="divide-y divide-gray-200 dark:divide-gray-700">
      <li
        v-for="propiedad in propiedades"
        :key="propiedad._id"
        class="py-4 flex items-center justify-between"
      >
        <div class="flex items-center">
          <img
            v-if="propiedad.imagen_portada_url"
            :src="`http://localhost:3002/${propiedad.imagen_portada_url}`"
            :alt="propiedad.titulo"
            class="w-16 h-16 object-cover rounded mr-4"
          />
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-200">
              {{ propiedad.titulo }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-300">
              {{ propiedad.tipo }} - ${{ propiedad.precio }}
            </p>
          </div>
        </div>
        <div class="flex items-center">
          <button
            @click="openDetailsModal(propiedad)"
            class="ml-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Ver Detalles
          </button>
          <button
            @click="openEditModal(propiedad)"
            class="ml-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
          >
            Editar
          </button>
        </div>
      </li>
    </ul>
    <PropertyModal
      v-if="selectedProperty && !isEditModalOpen"
      :property="selectedProperty"
      @close="closeDetailsModal"
    />
    <PropertyFormModal
      v-if="isFormModalOpen"
      @close="closeFormModal"
      @property-added="fetchPropiedades"
    />
    <EditPropertyFormModal
      v-if="isEditModalOpen"
      :property="selectedProperty"
      @close="closeEditModal"
      @property-updated="fetchPropiedades"
    />
    <MapView v-if="showMap" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import PropertyModal from "@/components/PropertyModal.vue";
import PropertyFormModal from "@/components/PropertyFormModal.vue";
import EditPropertyFormModal from "@/components/EditPropertyFormModal.vue";
import MapView from "@/components/MapView.vue";

const propiedades = ref([]);
const selectedProperty = ref(null);
const isFormModalOpen = ref(false);
const isEditModalOpen = ref(false);
const showMap = ref(true); // Asegúrate de que el mapa esté visible

const fetchPropiedades = async () => {
  try {
    const response = await axios.get("http://localhost:3002/api/properties");
    propiedades.value = response.data;
  } catch (error) {
    console.error("Error al obtener propiedades", error);
  }
};

const openDetailsModal = (property) => {
  selectedProperty.value = property;
  isEditModalOpen.value = false;
};

const closeDetailsModal = () => {
  selectedProperty.value = null;
};

const openFormModal = () => {
  isFormModalOpen.value = true;
};

const closeFormModal = () => {
  isFormModalOpen.value = false;
};

const openEditModal = (property) => {
  selectedProperty.value = property;
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  selectedProperty.value = null;
  isEditModalOpen.value = false;
};

onMounted(() => {
  fetchPropiedades();
});
</script>
