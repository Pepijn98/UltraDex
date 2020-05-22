import { Plugin } from "@nuxt/types";

const plugin: Plugin = ({ app }, inject) => {
    inject("console", {
        info(message: string): void {
            console.log(`%c ℹ️ ${message}`, "color: #3273DC;");
        },
        buildInfo(override = false): void {
            const logged = sessionStorage.getItem("logged_info");
            if (logged !== "true") {
                console.log(`%c 🦊 [${app.$utils.lastModified()}] | Env: ${app.$settings.env} | Version: ${app.$settings.version} | Hash: ${process.env.HASH} | Branch: ${process.env.BRANCH}`, "color: #FD7E14;");
                sessionStorage.setItem("logged_info", "true");
            } else if (override) {
                console.log(`%c 🦊 [${app.$utils.lastModified()}] | Env: ${app.$settings.env} | Version: ${app.$settings.version} | Hash: ${process.env.HASH} | Branch: ${process.env.BRANCH}`, "color: #FD7E14;");
            }
        },
        success(message: string): void {
            console.log(`%c ✅ ${message}`, "color: #23D160;");
        },
        error(message: string): void {
            console.log(`%c ❌ ${message}`, "color: #FF3860;");
        },
        warning(message: string): void {
            console.log(`%c ⚠ ${message}`, "color: #FFDD57;");
        }
    });
};

export default plugin;
