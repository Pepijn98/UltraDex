import Vue from "vue";
import VuetifyToast from "vuetify-toast-snackbar";
import Loading from "vue-loading-overlay";
import UltraBar from "~/components/UltraBar.vue";

Vue.use(VuetifyToast);

Vue.component("loading", Loading);
Vue.component("ultrabar", UltraBar);
