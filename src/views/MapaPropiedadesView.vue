<template>
  <div class="flex h-screen relative">
    <!-- Listado de propiedades -->
    <div
      v-if="!isFormOpen && !isEditFormOpen"
      class="w-1/3 overflow-y-auto bg-white dark:bg-gray-800 p-4 z-10"
    >
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-200">
        Lista de propiedades
      </h2>
      <div class="flex justify-between mb-4">
        <button
          @click="openForm"
          class="flex items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
        >
          <PlusIcon class="h-5 w-5 mr-2" />
          Añadir Propiedad
        </button>
        <button
          @click="centerMapOnUserLocation"
          class="flex items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
        >
          <MapPinIcon class="h-5 w-5 mr-2" />
          Mi Ubicación
        </button>
      </div>
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
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-200"
              >
                {{ propiedad.direccion }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-300">
                {{ propiedad.titulo }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-300">
                {{ propiedad.tipo }} - ${{ propiedad.precio }}
              </p>
            </div>
          </div>
          <div class="flex items-center">
            <button
              @click="openEditForm(propiedad)"
              class="ml-2 py-2 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
            >
              <PencilIcon class="h-5 w-5" />
            </button>
            <button
              @click="deleteProperty(propiedad._id)"
              class="ml-2 py-2 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-300 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-200"
            >
              <TrashIcon class="h-5 w-5" />
            </button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Formularios -->
    <div
      v-if="isFormOpen || isEditFormOpen"
      class="w-1/3 overflow-y-auto bg-white dark:bg-gray-800 p-4 z-10"
    >
      <button @click="closeForm" class="absolute top-0 right-0 mt-4 mr-4">
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
      <PropiedadForm
        v-if="isFormOpen"
        @propiedad-added="handlePropertyAdded"
        @close="closeForm"
        :latitud="searchLatitud"
        :longitud="searchLongitud"
        @update:latitud="updateLatitud"
        @update:longitud="updateLongitud"
      />
      <PropiedadForm
        v-if="isEditFormOpen"
        :initialProperty="selectedProperty"
        @propiedad-updated="handlePropertyUpdated"
        @close="closeEditForm"
        :latitud="searchLatitud"
        :longitud="searchLongitud"
        @update:latitud="updateLatitud"
        @update:longitud="updateLongitud"
      />
    </div>

    <!-- Mapa -->
    <div class="w-2/3 relative">
      <div id="map" class="h-full w-full"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import "@/assets/markerClusterCustom.css"; // Importar el archivo CSS personalizado
import axios from "axios";
import PropiedadForm from "@/components/PropiedadForm.vue";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MapPinIcon,
} from "@heroicons/vue/24/outline";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

// Definir un icono personalizado para los marcadores individuales
const houseIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png", // Puedes cambiar esta URL a la de un icono de casa
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const map = ref(null);
const propiedades = ref([]);
const selectedProperty = ref(null);
const isFormOpen = ref(false);
const isEditFormOpen = ref(false);
const searchLatitud = ref(null);
const searchLongitud = ref(null);
const markers = ref([]);
const markerClusterGroup = ref(null);

const fetchPropiedades = async () => {
  try {
    const response = await axios.get("http://localhost:3002/api/properties");
    propiedades.value = response.data;
    updateMarkers();
  } catch (error) {
    console.error("Error al obtener propiedades", error);
  }
};

const updateMarkers = () => {
  // Eliminar todos los marcadores existentes
  if (markerClusterGroup.value) {
    markerClusterGroup.value.clearLayers();
  }

  // Agregar nuevos marcadores
  propiedades.value.forEach((propiedad) => {
    if (propiedad.latitud && propiedad.longitud) {
      const marker = L.marker([propiedad.latitud, propiedad.longitud], {
        icon: houseIcon,
      }) // Usar el icono personalizado aquí
        .bindPopup(
          `<b>${propiedad.titulo}</b><br>${propiedad.tipo}<br>$${propiedad.precio}`
        );
      markerClusterGroup.value.addLayer(marker);
    }
  });
};

const openForm = () => {
  isFormOpen.value = true;
};

const closeForm = () => {
  isFormOpen.value = false;
  searchLatitud.value = null;
  searchLongitud.value = null;
};

const openEditForm = (property) => {
  selectedProperty.value = property;
  isEditFormOpen.value = true;
  searchLatitud.value = property.latitud;
  searchLongitud.value = property.longitud;
};

const closeEditForm = () => {
  selectedProperty.value = null;
  isEditFormOpen.value = false;
  searchLatitud.value = null;
  searchLongitud.value = null;
};

const handlePropertyAdded = () => {
  fetchPropiedades();
  closeForm();
};

const handlePropertyUpdated = () => {
  fetchPropiedades();
  closeEditForm();
};

const deleteProperty = async (id) => {
  try {
    await axios.delete(`http://localhost:3002/api/properties/${id}`);
    fetchPropiedades();
  } catch (error) {
    console.error("Error al eliminar propiedad", error);
  }
};

const centerMapOnUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      map.value.setView([latitude, longitude], 13);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};

const updateLatitud = (newLatitud) => {
  searchLatitud.value = newLatitud;
};

const updateLongitud = (newLongitud) => {
  searchLongitud.value = newLongitud;
};

onMounted(async () => {
  await fetchPropiedades();

  map.value = L.map("map").setView([-43.3007, -65.1023], 13); // Coordenadas de Rawson, Chubut y zoom

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map.value);

  const provider = new OpenStreetMapProvider();
  const searchControl = new GeoSearchControl({
    provider: provider,
    style: "bar",
    autoComplete: true,
    autoCompleteDelay: 250,
    showMarker: true,
    retainZoomLevel: false,
    animateZoom: true,
    keepResult: true,
    searchLabel: "Buscar dirección",
  });

  map.value.addControl(searchControl);

  markerClusterGroup.value = L.markerClusterGroup({
    iconCreateFunction: function (cluster) {
      var childCount = cluster.getChildCount();
      var c = " marker-cluster-";
      if (childCount < 10) {
        c += "small";
      } else if (childCount < 100) {
        c += "medium";
      } else {
        c += "large";
      }
      return new L.DivIcon({
        html: "<div><span>" + childCount + "</span></div>",
        className: "marker-cluster" + c,
        iconSize: new L.Point(40, 40),
      });
    },
  });
  map.value.addLayer(markerClusterGroup.value);

  map.value.on("click", (e) => {
    if (isFormOpen.value || isEditFormOpen.value) {
      const { lat, lng } = e.latlng;
      searchLatitud.value = lat;
      searchLongitud.value = lng;
    }
  });

  map.value.on("geosearch/showlocation", (result) => {
    const { x, y } = result.location;
    searchLatitud.value = y;
    searchLongitud.value = x;
    if (isFormOpen.value || isEditFormOpen.value) {
      selectedProperty.value.latitud = y;
      selectedProperty.value.longitud = x;
    }
  });

  updateMarkers();
});

const handleKeydown = (event) => {
  if (event.key === "Escape") {
    if (isFormOpen.value) {
      closeForm();
    } else if (isEditFormOpen.value) {
      closeEditForm();
    }
  }
};

document.addEventListener("keydown", handleKeydown);

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>
