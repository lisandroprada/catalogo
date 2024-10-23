import { ref, watch } from "vue";

const isDarkMode = ref(false);

export function useDarkMode() {
  // Comprueba si hay una preferencia guardada en localStorage
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode) {
    isDarkMode.value = JSON.parse(savedMode);
  } else {
    // Si no hay preferencia guardada, usa la preferencia del sistema
    isDarkMode.value = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
  }

  // Aplica el modo oscuro al body
  watch(
    isDarkMode,
    (newValue) => {
      if (newValue) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      // Guarda la preferencia en localStorage
      localStorage.setItem("darkMode", JSON.stringify(newValue));
    },
    { immediate: true },
  );

  // Función para cambiar el modo
  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value;
  }

  return {
    isDarkMode,
    toggleDarkMode,
  };
}
