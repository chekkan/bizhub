export default {
    loginUrl: "/oauth/token",
    debug: true,
    testing: true,
    apiBaseUrl: "http://localhost:5000",
    googleAnalytics: {
        trackingId: "UA-82866053-1",
        config: {
            logging: {
                enabled: true
            },
            pageTracking: {
                enabled: false
            },
            clickTracking: {
                enabled: false
            }
        }
    }
}
