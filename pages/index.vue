<template>
    <div />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
    head: {
        title: "UltraDex / Home",
        meta: [
            { hid: "og-title", property: "og:title", content: "UltraDex / Home" }
        ]
    }
})
export default class IndexPage extends Vue {}
</script>
