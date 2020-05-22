import { NuxtAppOptions } from "@nuxt/types";

declare global {
    interface Window {
        onNuxtReady(cb: (app: NuxtAppOptions) => any): void;
    }
}
