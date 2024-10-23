<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
            v-for="propiedad in propiedades"
            :key="propiedad._id"
            class="bg-white dark:bg-gray-700 shadow rounded-lg overflow-hidden"
        >
            <img
                v-if="propiedad.imagen_portada_url"
                :src="`http://localhost:3002/${propiedad.imagen_portada_url}`"
                :alt="propiedad.titulo"
                class="w-full h-48 object-cover"
            />
            <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    {{ propiedad.titulo }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-300 mt-1">
                    {{ propiedad.tipo }}
                </p>
                <p class="text-gray-600 dark:text-gray-300 mt-2">
                    {{ propiedad.descripcion }}
                </p>
                <p
                    class="text-indigo-600 dark:text-indigo-400 font-semibold mt-2"
                >
                    Precio: ${{ propiedad.precio }}
                </p>
                <p class="text-gray-600 dark:text-gray-300 mt-1">
                    Dirección: {{ propiedad.direccion }}
                </p>
                <p class="text-gray-600 dark:text-gray-300 mt-1">
                    Propietario: {{ propiedad.propietario }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

const propiedades = ref([]);

const fetchPropiedades = async () => {
    try {
        const response = await axios.get(
            "http://localhost:3002/api/properties",
        );
        propiedades.value = response.data;
    } catch (error) {
        console.error("Error al obtener propiedades", error);
    }
};

onMounted(() => {
    fetchPropiedades();
});
</script>
