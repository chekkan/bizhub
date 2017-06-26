export class AuthFilterValueConverter {
    /**
     * route toView predictator on route.config.auth === isAuthenticated
     */
    toView(routes, isAuthenticated) {
        return routes.filter(route => typeof route.config.auth !== "boolean"
            || route.config.auth === isAuthenticated)
    }
}
