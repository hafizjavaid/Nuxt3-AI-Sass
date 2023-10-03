
import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import AutoComplete from "primevue/AutoComplete";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: false });
    nuxtApp.vueApp.component("AutoComplete", AutoComplete);
    //other components that you need
});
