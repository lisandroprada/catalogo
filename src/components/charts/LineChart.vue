<template>
    <canvas ref="chartRef"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from "vue";
import Chart from "chart.js/auto";

const props = defineProps<{
    chartData: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            borderColor: string;
            backgroundColor: string;
        }[];
    };
}>();

const chartRef = ref<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;

const createChart = () => {
    if (chartRef.value) {
        chart = new Chart(chartRef.value, {
            type: "line",
            data: props.chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "top" as const,
                    },
                    title: {
                        display: true,
                        text: "Índices Económicos de Chubut",
                    },
                },
            },
        });
    }
};

onMounted(() => {
    createChart();
});

watch(
    () => props.chartData,
    (newData) => {
        if (chart) {
            chart.data = newData;
            chart.update();
        }
    },
    { deep: true },
);

onUnmounted(() => {
    if (chart) {
        chart.destroy();
    }
});
</script>
