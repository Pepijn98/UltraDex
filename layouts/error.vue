<template>
    <div class="is-error">
        <div class="container">
            <div class="content-outer">
                <div class="content">
                    <b-icon pack="far" icon="frown" />
                    <h1 v-if="error.statusCode === 404" class="title">{{ error.statusCode }} Not Found</h1>
                    <h1 v-else class="title">{{ error.statusCode }} Failed loading page</h1>
                    <hr>
                    <h6 class="message">{{ error.message }}</h6>
                    <b-button :icon-left="to.icon" type="is-danger" tag="nuxt-link" :to="to.path">
                        {{ to.text }}
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ErrorLayout extends Vue {
    @Prop({ type: Object, required: true }) error!: Object

    get to() {
        if (this.$utils.isEmptyObject(this.$nuxt.context.from))
            return { path: "/", text: "Home", pack: "fad", icon: "home-lg" };

        if (this.$route.name !== this.$nuxt.context.from.name)
            return { path: this.$nuxt.context.from.path, text: "Back", pack: "fas", icon: "caret-left" };

        if ((this.error as any).statusCode === 404)
            return { path: "/", text: "Home", pack: "fad", icon: "home-lg" };

        return { path: this.$route.path, text: "Refresh", pack: "fas", icon: "redo-alt" };
    }

    mounted() {
        this.$console.buildInfo();
    }
};
</script>
