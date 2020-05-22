<template>
    <v-toolbar absolute scroll-off-screen scroll-target="#scrolling-techniques">
        <v-toolbar-side-icon />

        <v-toolbar-title>ULTRADEX</v-toolbar-title>

        <v-toolbar-items>
            <v-input />
        </v-toolbar-items>
    </v-toolbar>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class UltraBar extends Vue {
    mounted() {
        const ref = this.$refs[this.$route.path] as Vue;
        if (ref) ref.$el.classList.add("is-active");
    }
}
</script>
