
import pkg from "./package.json";
import Settings from "~/interfaces/Settings";

const settings: Settings = {
    env: process.env.NODE_ENV || "development",
    version: pkg.version,
    host: process.env.NODE_ENV === "production" ? "https://ultradex.pro" : "http://localhost:3000",
    api: "https://pokeapi.co/api/v2",
    google: {
        test: false,
        analytics: {
            trackingId: "UA-88870908-4",
            accountId: "88870908",
            domain: process.env.NODE_ENV === "production" ? "https://ultradex.pro" : "http://localhost:3000"
        }
    },
    sentry: {
        dsn: "https://f8b461a02563499a939dbbb8dbe58303@sentry.io/5173569",
        // publishRelease: true,
        // attachCommits: true,
        repo: pkg.repository.url,
        config: {
            environment: process.env.NODE_ENV || "development"
        }
    }
};

export default settings;
