<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Cleave from "cleave.js";

// Coeficientes según plazo
const COEFICIENTES = {
  240: {
    cuotaVariablePorcentaje: 0.0058,
    cuotaUVAFijaPorcentaje: 0.0058,
  },
  120: {
    cuotaVariablePorcentaje: 0.00989,
    cuotaUVAFijaPorcentaje: 0.00989,
  },
};

const montoOtorgar = ref("50000000");
const valorUVA = ref("1208.20");
const plazo = ref("240");

const montoUVA = ref("");
const cuotaVariable = ref("");
const cuotaUVAFija = ref("");
const ingresoMensual = ref("");

function calcularMontoUVA(monto: number, valorUVA: number): number {
  return monto / valorUVA;
}

function calcularCuotaVariable(monto: number, plazo: number): number {
  return (
    monto *
    COEFICIENTES[plazo as keyof typeof COEFICIENTES].cuotaVariablePorcentaje
  );
}

function calcularCuotaUVAFija(montoUVA: number, plazo: number): number {
  return (
    montoUVA *
    COEFICIENTES[plazo as keyof typeof COEFICIENTES].cuotaUVAFijaPorcentaje
  );
}

function calcularIngresoMensual(cuotaVariable: number): number {
  return cuotaVariable * 4;
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

function actualizarCalculos() {
  const monto = parseFloat(
    montoOtorgar.value.replace(/\./g, "").replace(",", ".")
  );
  const uva = parseFloat(valorUVA.value.replace(",", "."));
  const plazoMeses = parseInt(plazo.value);

  const montoUVACalculado = calcularMontoUVA(monto, uva);
  const cuotaVariableCalculada = calcularCuotaVariable(monto, plazoMeses);
  const cuotaUVAFijaCalculada = calcularCuotaUVAFija(
    montoUVACalculado,
    plazoMeses
  );
  const ingresoMensualCalculado = calcularIngresoMensual(
    cuotaVariableCalculada
  );

  montoUVA.value = formatNumber(montoUVACalculado);
  cuotaVariable.value = "$ " + formatNumber(cuotaVariableCalculada);
  cuotaUVAFija.value = formatNumber(cuotaUVAFijaCalculada);
  ingresoMensual.value = "$ " + formatNumber(ingresoMensualCalculado);

  // Guardar el valor de la UVA en localStorage
  localStorage.setItem("valorUVA", uva.toString());
}

function limpiarCalculadora() {
  montoOtorgar.value = "";
  valorUVA.value = "";
  plazo.value = "240";
  montoUVA.value = "";
  cuotaVariable.value = "";
  cuotaUVAFija.value = "";
  ingresoMensual.value = "";
}

function generarPDF() {
  // Implementa la lógica para generar el PDF
  console.log("Generando PDF...");
  // Aquí puedes usar jsPDF para generar el PDF
}

onMounted(() => {
  const cleaveInstance = new Cleave("#montoOtorgar", {
    numeral: true,
    numeralThousandsGroupStyle: "thousand",
    delimiter: ".",
    numeralDecimalMark: ",",
  });

  // Cargar el valor de la UVA desde localStorage si existe
  const valorUVAStored = localStorage.getItem("valorUVA");
  if (valorUVAStored) {
    valorUVA.value = valorUVAStored;
  }

  // Actualizar el valor del campo de entrada después de que Cleave.js se haya aplicado
  cleaveInstance.setRawValue(montoOtorgar.value);

  actualizarCalculos();
});

watch(montoOtorgar, actualizarCalculos);
watch(valorUVA, actualizarCalculos);
watch(plazo, actualizarCalculos);
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 sm:p-6 max-w-2xl mx-auto transition-colors duration-300"
  >
    <h2
      class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6"
    >
      Simulación de Créditos Hipotecarios
    </h2>
    <div class="space-y-4">
      <div class="flex flex-col">
        <label
          for="montoOtorgar"
          class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >Monto a otorgar en pesos ($):</label
        >
        <input
          type="text"
          id="montoOtorgar"
          v-model="montoOtorgar"
          class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div class="flex flex-col">
        <label
          for="valorUVA"
          class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >Valor de la UVA:</label
        >
        <input
          type="text"
          id="valorUVA"
          v-model="valorUVA"
          class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div class="flex flex-col">
        <label
          for="plazo"
          class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >Plazo del crédito (meses):</label
        >
        <select
          id="plazo"
          v-model="plazo"
          class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
        >
          <option value="240">240 meses</option>
          <option value="120">120 meses</option>
        </select>
      </div>
    </div>

    <div class="mt-6 bg-gray-50 dark:bg-gray-700 rounded-md p-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-3">
        Resultados
      </h3>
      <div class="space-y-2">
        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-300">Monto en UVA:</span>
          <span class="font-medium text-gray-800 dark:text-white">{{
            montoUVA
          }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-300"
            >Valor Cuota $ (Variable):</span
          >
          <span class="font-medium text-gray-800 dark:text-white">{{
            cuotaVariable
          }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-300"
            >Valor Cuota UVA (Fija):</span
          >
          <span class="font-medium text-gray-800 dark:text-white">{{
            cuotaUVAFija
          }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-300"
            >Estimación de ingreso Mensual:</span
          >
          <span class="font-medium text-gray-800 dark:text-white">{{
            ingresoMensual
          }}</span>
        </div>
      </div>
    </div>

    <div class="mt-6 flex justify-between">
      <button
        @click="limpiarCalculadora"
        class="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-200"
      >
        Limpiar Calculadora
      </button>
      <button
        @click="generarPDF"
        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-200"
      >
        Generar PDF
      </button>
    </div>
  </div>
</template>
