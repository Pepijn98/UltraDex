interface Analytics {
    trackingId: string;
    accountId: string;
    domain: string;
}

interface Google {
    test: boolean;
    analytics: Analytics;
}

interface SentryConfig {
    environment: string;
}

interface Sentry {
    dsn: string;
    // publishRelease: boolean;
    // attachCommits: boolean;
    repo: string;
    config: SentryConfig;
}

interface Settings {
    env: string;
    version: string;
    host: string;
    api: string;
    google: Google;
    sentry: Sentry;
}

export default Settings;
