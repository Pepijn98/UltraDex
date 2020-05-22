import { Plugin, NuxtAppOptions } from "@nuxt/types";

function checkDarkmode(app: NuxtAppOptions) {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") app.$utils.darkmode = true;
    else app.$utils.darkmode = false;
}

const plugin: Plugin = ({ app }) => {
    app.router!.afterEach(() => checkDarkmode(app));
};

export default plugin;
