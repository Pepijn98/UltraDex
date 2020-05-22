<template>
    <v-app v-if="isReady">
        <nuxt />
    </v-app>
    <v-app v-else>
        <loading :active="!isReady" color="#e8ba4b" :height="144" :width="144" />
    </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class DefaultLayout extends Vue {
    name = "Default";
    isReady = false;

    async mounted() {
        await this.$utils.wait(1000);
        this.isReady = true;

        let theme = localStorage.getItem("theme");
        if (!theme) {
            localStorage.setItem("theme", "dark");
            theme = "dark";
        }
        this.$vuetify.theme.dark = theme === "dark";

        this.$console.buildInfo();
    }
};
</script>
