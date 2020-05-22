import Console from "~/interfaces/Console";
import Settings from "~/interfaces/Settings";
import Utils from "~/interfaces/Utils";
import * as SentryTypes from "@sentry/minimal";
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { VuetifyToastObject } from "vuetify-toast-snackbar";
import { Vuetify } from "vuetify";

interface VuetifyToastShow {
    (message: string, options?: VuetifyToastObject): void
}

interface VuetifyToastMethods extends VuetifyToastShow {
    getCmp: any
    clearQueue: any
    [key: string]: VuetifyToastShow
}

declare module "@nuxt/types" {
    interface Context {
        $axios: NuxtAxiosInstance;
        readonly $sentry: typeof SentryTypes;
    }

    interface NuxtAppOptions {
        // @nuxtjs/axios
        $axios: NuxtAxiosInstance;

        // plugins
        $console: Console;
        $http: NuxtAxiosInstance;
        $settings: Settings;
        $utils: Utils;

        $toast: VuetifyToastMethods;
        $pokeapi: any;

        $vuetify: Vuetify;

        // sentry
        readonly $sentry: typeof SentryTypes;
    }
}
