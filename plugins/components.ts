import Vue from "vue";

// External Components
import VuetifyToast from "vuetify-toast-snackbar";
import Loading from "vue-loading-overlay";
import Avatar from "vue-avatar-component/Avatar.vue";
import ImageCrop from "vue-image-crop-upload/upload-2.vue";

// My components
import UltraBar from "~/components/UltraBar.vue";

Vue.use(VuetifyToast);

// External Components
Vue.component("loading", Loading);
Vue.component("avatar", Avatar);
Vue.component("image-crop-upload", ImageCrop);

// My components
Vue.component("ultrabar", UltraBar);
