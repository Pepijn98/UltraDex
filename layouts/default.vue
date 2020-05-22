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

<style lang="scss">
.is-full-page {
    min-height: 100vh;
    max-width: 100%;
}

.vld-icon {
    height: 144px;
    width: 144px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>
