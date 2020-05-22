import settings from "~/settings";
import { Plugin } from "@nuxt/types";

const plugin: Plugin = (_, inject) => {
    Reflect.deleteProperty(settings.google.analytics, "accountId");
    Reflect.deleteProperty(settings.google.analytics, "trackingId");
    Reflect.deleteProperty(settings.sentry, "dsn");
    inject("settings", settings);
};

export default plugin;
