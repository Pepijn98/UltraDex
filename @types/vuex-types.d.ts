import Api from "~/interfaces/Api";
import Console from "~/interfaces/Console";
import Settings from "~/interfaces/Settings";
import Utils from "~/interfaces/Utils";
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
        $api: Api;
        $console: Console;
        $http: NuxtAxiosInstance;
        $settings: Settings;
        $utils: Utils;

        $toast: VuetifyToastMethods;

        // sentry
        readonly $sentry: typeof SentryTypes;
    }
}
