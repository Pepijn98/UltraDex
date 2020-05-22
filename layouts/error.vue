<template>
    <div class="content">
        <v-icon class="icon" color="error" size="200px">mdi-alert-circle</v-icon>
        <h1 v-if="error.statusCode === 404" class="error-title">{{ error.statusCode }} Not Found</h1>
        <h1 v-else class="error-title">{{ error.statusCode }} Failed loading page</h1>
        <h5 class="message">{{ error.message }}</h5>
        <v-btn :icon-left="to.icon" :to="to.path" color="error" nuxt small>
            <v-icon left>{{ to.icon }}</v-icon> {{ to.text }}
        </v-btn>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ErrorLayout extends Vue {
    @Prop({ type: Object, required: true }) error!: Object

    get to() {
        if (this.$utils.isEmptyObject(this.$nuxt.context.from))
            return { path: "/", text: "Home", icon: "mdi-home" };

        if (this.$route.name !== this.$nuxt.context.from.name)
            return { path: this.$nuxt.context.from.path, text: "Back", icon: "mdi-arrow_left" };

        if ((this.error as any).statusCode === 404)
            return { path: "/", text: "Home", icon: "mdi-home" };

        return { path: this.$route.path, text: "Refresh", icon: "mdi-refresh" };
    }

    mounted() {
        this.$console.buildInfo();
    }
};
</script>

<style lang="scss">
.content {
    margin: auto;
    width: 50%;
    text-align: center;

    .icon {
        color: #ff5252;
    }

    .error-title {
        font-size: 2.5rem;
        color: #ff5252;
    }

    .message {
        font-size: 1.25em;
        margin-bottom: 10px;
        color: #ff5252;
    }
}
</style>
