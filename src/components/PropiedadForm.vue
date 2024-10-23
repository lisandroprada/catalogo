<template>
  <form
    @submit.prevent="submitForm"
    class="space-y-4 bg-gray-200 dark:bg-gray-700 p-6 rounded-lg shadow-lg"
  >
    <!-- Campos del formulario -->
    <div>
      <label
        for="titulo"
        class="block text-sm font-medium text-gray-900 dark:text-gray-100"
        >Título</label
      >
      <input
        v-model="propiedad.titulo"
        id="titulo"
        type="text"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
      />
    </div>

    <div>
      <label
        for="tipo"
        class="block text-sm font-medium text-gray-900 dark:text-gray-100"
        >Tipo de Inmueble</label
      >
      <select
        v-model="propiedad.tipo"
        id="tipo"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
      >
        <option value="casa">Casa</option>
        <option value="departamento">Departamento</option>
        <option value="terreno">Terreno</option>
        <option value="local_comercial">Local Comercial</option>
        <option value="oficina">Oficina</option>
      </select>
    </div>

    <div>
      <label
        for="descripcion"
        class="block text-sm font-medium text-gray-900 dark:text-gray-100"
        >Descripción</label
      >
      <textarea
        v-model="propiedad.descripcion"
        id="descripcion"
        rows="3"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
      ></textarea>
    </div>

    <div>
      <label
        for="precio"
        class="block text-sm font-medium text-gray-900 dark:text-gray-100"
        >Precio</label
      >
      <input
        v-model="propiedad.precio"
        id="precio"
        type="number"
        step="0.01"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
      />
    </div>

    <div>
      <label
        for="direccion"
        class="block text-sm font-medium text-gray-900 dark:text-gray-100"
        >Dirección</label
      >
      <input
        v-model="propiedad.direccion"
        id="direccion"
        type="text"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
      />
    </div>

    <div>
      <label
        for="propietario"
        class="block text-sm font-medium text-gray-900 dark:text-gray-100"
        >Propietario</label
      >
      <input
        v-model="propiedad.propietario"
        id="propietario"
        type="text"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
      />
    </div>

    <div>
      <label
        for="latitud"
        class="block text-sm font-medium text-gray-900 dark:text-gray-100"
        >Latitud</label
      >
      <input
        :value="latitud"
        @input="$emit('update:latitud', parseFloat($event.target.value))"
        id="latitud"
        type="number"
        step="0.000001"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
      />
    </div>

    <div>
      <label
        for="longitud"
        class="block text-sm font-medium text-gray-900 dark:text-gray-100"
        >Longitud</label
      >
      <input
        :value="longitud"
        @input="$emit('update:longitud', parseFloat($event.target.value))"
        id="longitud"
        type="number"
        step="0.000001"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
      />
    </div>

    <!-- Inputs de archivos -->
    <div>
      <label
        for="imagen_portada"
        class="block text-sm font-medium text-gray-900 dark:text-gray-100"
      >
        Imagen de portada
      </label>
      <input
        type="file"
        id="imagen_portada"
        @change="handlePortadaUpload"
        accept="image/*"
        :required="!isEditMode"
        class="mt-1 block w-full text-sm text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-700 dark:file:text-gray-100"
      />
      <p
        v-if="imagen_portada"
        class="mt-1 text-sm text-gray-900 dark:text-gray-100"
      >
        Archivo seleccionado: {{ imagen_portada.name }}
      </p>
    </div>

    <div>
      <label
        for="imagenes"
        class="block text-sm font-medium text-gray-900 dark:text-gray-100"
      >
        Imágenes adicionales
      </label>
      <input
        type="file"
        id="imagenes"
        @change="handleImagenesUpload"
        accept="image/*"
        multiple
        class="mt-1 block w-full text-sm text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-700 dark:file:text-gray-100"
      />
      <div v-if="imagenes.length" class="mt-1">
        <p class="text-sm text-gray-900 dark:text-gray-100">
          Archivos seleccionados:
        </p>
        <ul class="list-disc pl-5 text-sm text-gray-900 dark:text-gray-100">
          <li v-for="(file, index) in imagenes" :key="index">
            {{ file.name }}
          </li>
        </ul>
      </div>
    </div>

    <button
      type="submit"
      :disabled="isSubmitting"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
    >
      {{
        isSubmitting
          ? "Enviando..."
          : isEditMode
          ? "Actualizar Propiedad"
          : "Añadir Propiedad"
      }}
    </button>
    <p v-if="errorMessage" class="mt-2 text-sm text-red-600">
      {{ errorMessage }}
    </p>
  </form>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";

const emit = defineEmits([
  "propiedad-added",
  "propiedad-updated",
  "update:latitud",
  "update:longitud",
]);
const props = defineProps({
  initialProperty: {
    type: Object,
    default: () => ({
      titulo: "",
      tipo: "",
      descripcion: "",
      precio: "",
      direccion: "",
      propietario: "",
      latitud: "",
      longitud: "",
    }),
  },
  latitud: {
    type: Number,
    default: null,
  },
  longitud: {
    type: Number,
    default: null,
  },
});

const propiedad = ref({ ...props.initialProperty });
const imagen_portada = ref(null);
const imagenes = ref([]);
const isSubmitting = ref(false);
const errorMessage = ref("");
const isEditMode = ref(false);

watch(
  () => props.initialProperty,
  (newVal) => {
    propiedad.value = { ...newVal };
    isEditMode.value = !!newVal._id;
  },
  { immediate: true }
);

watch(
  () => props.latitud,
  (newVal) => {
    if (newVal !== null) {
      propiedad.value.latitud = newVal;
    }
  },
  { immediate: true }
);

watch(
  () => props.longitud,
  (newVal) => {
    if (newVal !== null) {
      propiedad.value.longitud = newVal;
    }
  },
  { immediate: true }
);

// Manejadores de archivos
const handlePortadaUpload = (event) => {
  const files = event.target.files;
  if (files && files.length > 0) {
    imagen_portada.value = files[0];
    console.log("Imagen de portada seleccionada:", imagen_portada.value.name);
  }
};

const handleImagenesUpload = (event) => {
  const files = event.target.files;
  if (files) {
    imagenes.value = Array.from(files);
    console.log(
      "Imágenes adicionales seleccionadas:",
      imagenes.value.map((f) => f.name)
    );
  }
};

const submitForm = async () => {
  if (isSubmitting.value) return;

  try {
    isSubmitting.value = true;
    errorMessage.value = "";
    console.log("Iniciando envío del formulario");

    const formData = new FormData();

    // Agregar datos básicos de la propiedad
    Object.entries(propiedad.value).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    // Agregar latitud y longitud
    formData.set("latitud", propiedad.value.latitud);
    formData.set("longitud", propiedad.value.longitud);

    // Agregar imagen de portada
    if (imagen_portada.value) {
      formData.append("imagen_portada", imagen_portada.value);
      console.log("Agregada imagen de portada:", imagen_portada.value.name);
    } else if (!isEditMode.value) {
      throw new Error("La imagen de portada es requerida");
    }

    // Agregar imágenes adicionales
    imagenes.value.forEach((file, index) => {
      formData.append("imagenes", file);
      console.log(`Agregada imagen adicional ${index + 1}:`, file.name);
    });

    // Log del contenido del FormData
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File - ${value.name} (${value.size} bytes)`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    const url = isEditMode.value
      ? `http://localhost:3002/api/properties/${propiedad.value._id}`
      : "http://localhost:3002/api/properties";

    const method = isEditMode.value ? "put" : "post";

    const response = await axios({
      method,
      url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log("Progreso de subida:", percentCompleted + "%");
      },
    });

    console.log("Respuesta del servidor:", response.data);
    if (isEditMode.value) {
      emit("propiedad-updated");
    } else {
      emit("propiedad-added");
    }

    // Limpiar formulario
    propiedad.value = {
      titulo: "",
      tipo: "",
      descripcion: "",
      precio: "",
      direccion: "",
      propietario: "",
      latitud: "",
      longitud: "",
    };
    imagen_portada.value = null;
    imagenes.value = [];

    // Mostrar mensaje de éxito
    alert(
      isEditMode.value
        ? "Propiedad actualizada exitosamente"
        : "Propiedad agregada exitosamente"
    );
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    errorMessage.value =
      "Error al agregar la propiedad. Por favor, intente nuevamente.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>
