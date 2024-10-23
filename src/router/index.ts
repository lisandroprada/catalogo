import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "@/views/DashboardView.vue";
import ClientesView from "@/views/ClientesView.vue";
import CondicionesPrestamo from "@/views/CondicionesPrestamoView.vue";
import RequisitosView from "@/views/RequisitosView.vue";
import BeneficiariosView from "@/views/BeneficiariosView.vue";
import FinalidadPrestamo from "@/views/FinalidadPrestamoView.vue";
import SimulacionView from "@/views/SimulacionView.vue";
import AcercaDeView from "@/views/AcercaDeView.vue";
import ConfiguracionView from "@/views/ConfiguracionView.vue";
import PropiedadesView from "@/views/PropiedadesView.vue";
import MapaPropiedadesView from "@/views/MapaPropiedadesView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/clientes",
      name: "clientes",
      component: ClientesView,
    },
    {
      path: "/beneficiarios",
      name: "beneficiarios",
      component: BeneficiariosView,
    },
    {
      path: "/condiciones-prestamo",
      name: "condicionesPrestamo",
      component: CondicionesPrestamo,
    },
    {
      path: "/requisitos",
      name: "requisitos",
      component: RequisitosView,
    },
    {
      path: "/finalidad-prestamo",
      name: "finalidadPrestamo",
      component: FinalidadPrestamo,
    },
    {
      path: "/simulacion",
      name: "simulacion",
      component: SimulacionView,
    },
    {
      path: "/acerca-de",
      name: "acercaDe",
      component: AcercaDeView,
    },
    {
      path: "/configuracion",
      name: "configuracion",
      component: ConfiguracionView,
    },
    {
      path: "/propiedades",
      name: "propiedades",
      component: PropiedadesView,
    },
    {
      path: "/mapa-propiedades",
      name: "mapaPropiedades",
      component: MapaPropiedadesView,
    },
  ],
});

export default router;
