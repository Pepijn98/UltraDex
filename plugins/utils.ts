import fs from "fs";
import path from "path";
import Utils from "~/interfaces/Utils";
import { Plugin, NuxtAppOptions } from "@nuxt/types";
import { NotificationType } from "~/interfaces/types";

/** Open a new notification message */
function notification(app: NuxtAppOptions, type: NotificationType, message: string) {
    app.$toast[type](message, {
        dismissable: true,
        queueable: false,
        multiLine: true
    });
}

const plugin: Plugin = ({ app }, inject) => {
    inject("utils", {
        beautifyName(ugly: string) {
            return ugly.split("-").map((part) => part.charAt(0).toUpperCase() + part.substr(1, part.length)).join(" ");
        },
        lastModified(): string {
            if (process.client) {
                return app.$utils.format(document.lastModified, true);
            } else {
                const stats = fs.lstatSync(path.join(__dirname, ".."));
                return app.$utils.format(stats.mtime, true);
            }
        },
        isEmptyObject(obj: Object): boolean {
            if (obj instanceof Object) {
                return Object.keys(obj).length <= 0;
            } else {
                return true;
            }
        },
        /** Show success notification */
        success(message: string, debug = false): void {
            if (debug) app.$console.success(message);
            notification(app, "success", message);
        },
        /** Show info notification */
        info(message: string, debug = false): void {
            if (debug) app.$console.info(message);
            notification(app, "info", message);
        },
        /** Show error notification */
        error(message: string, debug = false): void {
            if (debug) app.$console.error(message);
            notification(app, "error", message);
        },
        /** Show warning notification */
        warning(message: string, debug = false): void {
            if (debug) app.$console.warning(message);
            notification(app, "warning", message);
        },
        /** Capitalize string */
        capitalize(str: string): string {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        /** Format date using selected locale */
        format(toFormat: Date | string, includeTime = false): string {
            const date = new Date(toFormat);

            if (includeTime) {
                const time = date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
                const formatted = date.toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit" });
                return `${formatted} ${time}`;
            }

            return date.toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit" });
        },
        /** Wait x milliseconds */
        wait(m: number): Promise<void> {
            return new Promise((r) => setTimeout(r, m)); // eslint-disable-line promise/param-names
        },
        /** Return a array with number range */
        range(start: number, stop: number, step = 1): number[] {
            return Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step);
        }
    } as Utils); // Cast object to Utils interface for type interference
};

export default plugin;
