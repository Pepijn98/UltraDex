import Console from "~/interfaces/Console";
import Settings from "~/interfaces/Settings";
import Utils from "~/interfaces/Utils";
import Pokemon from "~/interfaces/Pokemon";
import * as SentryTypes from "@sentry/minimal";
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { VuetifyToastObject } from "vuetify-toast-snackbar";

interface VuetifyToastShow {
    (message: string, options?: VuetifyToastObject): void
}

interface VuetifyToastMethods extends VuetifyToastShow {
    getCmp: any
    clearQueue: any
    [key: string]: VuetifyToastShow
}

declare module "vuex/types/index" {
    interface Store<S> {
        // plugins
        $console: Console;
        $http: NuxtAxiosInstance;
        $settings: Settings;
        $utils: Utils;
        $pokemon: Pokemon;

        $toast: VuetifyToastMethods;
        $pokeapi: any;

        // sentry
        readonly $sentry: typeof SentryTypes;
    }
}
