<template>
    <v-app-bar class="ultrabar" color="primary" dark>
        <v-img
            class="mx-2"
            src="/static/images/logo.png"
            max-height="40"
            max-width="40"
            contain />
        <v-toolbar-title>ULTRADEX</v-toolbar-title>
        <v-text-field
            class="search"
            label="Pokemon name or ID"
            prepend-inner-icon="mdi-magnify"
            color="light"
            :height="30"
            :hide-details="true"
            rounded
            outlined />

        <div class="switch-wrapper">
            <label id="switch" class="switch">
                <input id="slider" type="checkbox" @click="toggleTheme">
                <span class="slider round" />
            </label>
        </div>
    </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class UltraBar extends Vue {
    mounted() {
        const theme = localStorage.getItem("theme");
        const slider = document.getElementById("slider") as HTMLInputElement;
        if (slider) {
            if (theme === "dark") {
                slider.checked = false;
            } else {
                slider.checked = true;
            }
        }
    }

    toggleTheme() {
        const theme = localStorage.getItem("theme");
        this.$vuetify.theme.dark = !(theme === "dark");
        localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
    }
}
</script>

<style lang="scss">
.v-text-field--outlined {
    > .v-input__control {
        > .v-input__slot {
            min-height: 35px;
        }
    }

    .v-label {
        top: 8px;
    }
}

.v-text-field--enclosed {
    .v-input__prepend-inner {
        margin-top: 6px;
    }
}

.search {
    .v-label--active {
        top: 16px;
    }
}
</style>

<style lang="scss" scoped>
.ultrabar {
    max-height: 64px;
    position: sticky;
    top: 0;
    z-index: 38;

    .search {
        max-width: 500px;
        margin-left: 20px;
    }

    .switch-wrapper {
        right: 0;
        position: absolute;
        margin-right: 10px;
    }

    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;

        input {
            opacity: 0;
            width: 0;
            height: 0;
        }
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: 0.4s;
        transition: 0.4s;

        &.round {
            border-radius: 34px;

            &:before {
                border-radius: 50%;
            }
        }

        &:before {
            position: absolute;
            content: "";
            height: 30px;
            width: 30px;
            left: 2px;
            bottom: 0;
            top: 0;
            margin: auto;
            -webkit-transition: 0.4s;
            transition: 0.4s;
            box-shadow: 0 0px 15px #2020203d;
            background: white url("~assets/images/night.png");
            background-repeat: no-repeat;
            background-position: center;
        }
    }

    input {
        &:checked + .slider {
            background-color: #66bb6a;
        }

        &:focus + .slider {
            box-shadow: 0 0 1px #66bb6a;
        }

        &:checked + .slider:before {
            -webkit-transform: translateX(24px);
            -ms-transform: translateX(24px);
            transform: translateX(24px);
            background: white url("~assets/images/sunny.png");
            background-repeat: no-repeat;
            background-position: center;
        }
    }
}
</style>
