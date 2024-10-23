<template>
  <div class="h-full w-full">
    <div id="map" class="h-full w-full"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const map = ref(null);
const propiedades = ref([]);

const fetchPropiedades = async () => {
  try {
    const response = await axios.get("http://localhost:3002/api/properties");
    propiedades.value = response.data;
  } catch (error) {
    console.error("Error al obtener propiedades", error);
  }
};

onMounted(async () => {
  await fetchPropiedades();

  map.value = L.map("map").setView([-43.3007, -65.1023], 13); // Coordenadas de Rawson, Chubut y zoom

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map.value);

  propiedades.value.forEach((propiedad) => {
    if (propiedad.latitud && propiedad.longitud) {
      L.marker([propiedad.latitud, propiedad.longitud])
        .addTo(map.value)
        .bindPopup(
          `<b>${propiedad.titulo}</b><br>${propiedad.tipo}<br>$${propiedad.precio}`
        );
    }
  });
});
</script>

<style scoped>
#map {
  height: 100vh;
  width: 100%;
}
</style>
