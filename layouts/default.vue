<template>
    <v-app v-if="isReady" :dark="$utils.darkmode">
        <ultrabar />
        <nuxt />
    </v-app>
    <v-app v-else :dark="$utils.darkmode">
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

        this.$console.buildInfo();
    }
};
</script>
