import { Configuration } from "@nuxt/types";
import StyleLintPlugin from "stylelint-webpack-plugin";
import git from "git-rev-sync";
import settings from "./settings";

const config: Configuration = {
    mode: "spa",
    generate: {
        fallback: "404.shtml"
    },
    router: {
        prefetchLinks: true
    },
    env: {
        HASH: git.short(),
        BRANCH: git.branch()
    },
    head: {
        title: "UltraDex",
        htmlAttrs: {
            lang: "en"
        },
        meta: [
            { "http-equiv": "X-UA-Compatible", property: "http-equiv", content: "IE=edge" },
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "author", name: "author", content: "Pepijn van den Broek" },
            { hid: "description", name: "description", content: "Lookup any pokemon in the pokedex" },
            { hid: "theme-color", name: "theme-color", content: "#e8ba4b" },
            { hid: "og-title", property: "og:title", content: "UltraDex" },
            { hid: "og-url", property: "og:url", content: settings.host },
            { hid: "og-image", property: "og:image", content: `${settings.host}/static/images/logo.png` },
            { hid: "og-type", property: "og:type", content: "website" },
            { hid: "og-site_name", property: "og:site_name", content: settings.host },
            { hid: "og-description", property: "og:description", content: "Lookup any pokemon in the pokedex" },
            { hid: "og-locale", property: "og:locale", content: "en" },
            { hid: "application-name", property: "application-name", content: "UltraDex" },
            { hid: "fragment", property: "fragment", content: "!" },
            { hid: "apple-mobile-web-app-capable", property: "apple-mobile-web-app-capable", content: "yes" },
            { hid: "msapplication-TileColor", name: "msapplication-TileColor", content: "#e8ba4b" },
            { hid: "msapplication-TileImage", name: "msapplication-TileImage", content: `${settings.host}/static/icons/mstile-144x144.png` },
            { hid: "msapplication-square70x70logo", name: "msapplication-square70x70logo", content: `${settings.host}/static/icons/mstile-70x70.png` },
            { hid: "msapplication-square150x150logo", name: "msapplication-square150x150logo", content: `${settings.host}/static/icons/mstile-150x150.png` },
            { hid: "msapplication-wide310x150logo", name: "msapplication-wide310x150logo", content: `${settings.host}/static/icons/mstile-310x150.png` },
            { hid: "msapplication-square310x310logo", name: "msapplication-square310x310logo", content: `${settings.host}/static/icons/mstile-310x310.png` },
            { hid: "msapplication-config", property: "msapplication-config", content: `${settings.host}/static/icons/browserconfig.xml` }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/static/icons/favicon.ico" },
            { rel: "shortcut icon", href: "/static/icons/favicon.ico" },
            { rel: "apple-touch-icon-precomposed", sizes: "57x57", href: "/static/icons/apple-touch-icon-57x57.png" },
            { rel: "apple-touch-icon-precomposed", sizes: "114x114", href: "/static/icons/apple-touch-icon-114x114.png" },
            { rel: "apple-touch-icon-precomposed", sizes: "72x72", href: "/static/icons/apple-touch-icon-72x72.png" },
            { rel: "apple-touch-icon-precomposed", sizes: "144x144", href: "/static/icons/apple-touch-icon-144x144.png" },
            { rel: "apple-touch-icon-precomposed", sizes: "60x60", href: "/static/icons/apple-touch-icon-60x60.png" },
            { rel: "apple-touch-icon-precomposed", sizes: "120x120", href: "/static/icons/apple-touch-icon-120x120.png" },
            { rel: "apple-touch-icon-precomposed", sizes: "76x76", href: "/static/icons/apple-touch-icon-76x76.png" },
            { rel: "apple-touch-icon-precomposed", sizes: "152x152", href: "/static/icons/apple-touch-icon-152x152.png" },
            { rel: "icon", type: "image/png", href: "/static/icons/favicon-196x196.png", sizes: "196x196" },
            { rel: "icon", type: "image/png", href: "/static/icons/favicon-96x96.png", sizes: "96x96" },
            { rel: "icon", type: "image/png", href: "/static/icons/favicon-32x32.png", sizes: "32x32" },
            { rel: "icon", type: "image/png", href: "/static/icons/favicon-16x16.png", sizes: "16x16" },
            { rel: "icon", type: "image/png", href: "/static/icons/favicon-128.png", sizes: "128x128" },
            { rel: "manifest", href: "/static/icons/manifest.json" },
            { rel: "mask-icon", href: "/static/icons/android-chrome-512x512.png", color: "#e8ba4b" },

            // External links
            { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" },
            { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" }
        ],
        script: [
            // Polyfill nuxtjs prefetch links
            { src: "https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver", body: true },
            // Polyfill es6 promise
            { src: "https://cdnjs.cloudflare.com/ajax/libs/es6-promise/4.1.1/es6-promise.min.js", body: true },
            { src: "https://cdnjs.cloudflare.com/ajax/libs/es6-promise/4.1.1/es6-promise.min.map", body: true }
        ],
        noscript: [
            { innerHTML: "This website requires JavaScript." }
        ]
    },
    loading: { color: "#e8ba4b" },
    css: [],
    plugins: [
        "~/plugins/components.ts",
        "~/plugins/settings.ts",
        "~/plugins/console.ts",
        "~/plugins/utils.ts",
        "~/plugins/pokeapi.ts"
    ],
    buildModules: [
        "@nuxt/typescript-build", // Doc: https://typescript.nuxtjs.org/
        "@nuxtjs/eslint-module", // Doc: https://github.com/nuxt-community/eslint-module
        "@nuxtjs/google-analytics",
        "@nuxtjs/stylelint-module", // Doc: https://github.com/nuxt-community/stylelint-module
        "@nuxtjs/vuetify"
    ],
    modules: [
        "@nuxtjs/axios", // Doc: https://axios.nuxtjs.org/usage
        "@nuxtjs/component-cache",
        "@nuxtjs/dotenv", // Doc: https://github.com/nuxt-community/dotenv-module
        "@nuxtjs/pwa",
        "@nuxtjs/sentry",
        "@nuxtjs/sitemap"
    ],
    sentry: settings.sentry, // Doc: https://github.com/nuxt-community/sentry-module#readme
    googleAnalytics: {
        id: settings.google.analytics.trackingId
    },
    vuetify: {
        optionsPath: "./vuetify.options.js"
    },
    sitemap: {
        hostname: settings.host,
        gzip: true,
        defaults: {
            changefreq: "daily",
            priority: 1,
            lastmod: new Date(),
            lastmodrealtime: true
        }
    },
    build: {
        plugins: [
            (new StyleLintPlugin({ files: ["**/*.{vue,css,less,scss,sass}"] }) as any)
        ],
        // Extend webpack config
        extend(config, { isDev, isClient }) {
            config.node = {
                fs: "empty"
            };

            if (isDev && isClient) {
                if (config.module) {
                    config.module.rules.push({
                        enforce: "pre",
                        test: /\.(ts|js|vue)$/,
                        loader: "eslint-loader",
                        exclude: /(node_modules)/
                    });
                }
            }
        }
    }
};

export default config;
