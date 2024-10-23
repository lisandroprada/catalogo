<template>
    <div>
        <h2>Prueba de Axios</h2>
        <button @click="testAxios">Probar Axios</button>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";

const testAxios = async () => {
    try {
        const response = await axios.get(
            "http://localhost:3002/api/properties",
        );
        console.log("Respuesta del servidor:", response.data);
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
    }
};
</script>
