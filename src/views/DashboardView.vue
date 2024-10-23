<template>
  <div class="dashboard">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-6">
      Dashboard
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- ... otros elementos del dashboard ... -->
      <div
        class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow col-span-full"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">
          Índices Económicos de Chubut
        </h2>
        <div class="h-80">
          <LineChart
            v-if="economicIndicesData"
            :chartData="economicIndicesData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import LineChart from "@/components/charts/LineChart.vue";

const economicIndicesData = ref(null);

onMounted(async () => {
  try {
    const response = await fetch("/data/economic_indices.json");
    economicIndicesData.value = await response.json();
  } catch (error) {
    console.error("Error loading economic indices data:", error);
  }
});
</script>
