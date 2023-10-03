import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";

import Card from "primevue/card";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: false });
  nuxtApp.vueApp.component("Card", Card);

  //other components that you need
});
