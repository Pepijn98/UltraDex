
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
            trackingId: "UA-88870908-6",
            accountId: "88870908",
            domain: process.env.NODE_ENV === "production" ? "https://ultradex.pro" : "http://localhost:3000"
        }
    },
    sentry: {
        dsn: "https://b5773fe01b8e45c89742ce694f7fca05@o101961.ingest.sentry.io/5250915",
        // publishRelease: true,
        // attachCommits: true,
        repo: pkg.repository.url,
        config: {
            environment: process.env.NODE_ENV || "development"
        }
    }
};

export default settings;
