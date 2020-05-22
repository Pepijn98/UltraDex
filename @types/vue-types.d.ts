import Api from "~/interfaces/Api";
import Console from "~/interfaces/Console";
import Settings from "~/interfaces/Settings";
import Utils from "~/interfaces/Utils";
import * as SentryTypes from "@sentry/minimal";
import { NuxtAxiosInstance } from "@nuxtjs/axios";

declare module "vue/types/vue" {
    interface Vue {
        // plugins
        $api: Api;
        $console: Console;
        $http: NuxtAxiosInstance;
        $settings: Settings;
        $utils: Utils;

        // sentry
        readonly $sentry: typeof SentryTypes;
    }
}
