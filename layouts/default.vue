<template>
    <v-app v-if="isReady">
        <nuxt />
    </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class DefaultLayout extends Vue {
    name = "Default";
    isReady = false;

    async mounted() {
        let theme = localStorage.getItem("theme");
        if (!theme) {
            localStorage.setItem("theme", "dark");
            theme = "dark";
        }
        this.$vuetify.theme.dark = theme === "dark";

        await this.$utils.wait(1000);
        this.isReady = true;
        this.$console.buildInfo();
    }
};
</script>
