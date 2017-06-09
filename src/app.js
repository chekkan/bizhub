import {Router} from 'aurelia-router';
import {AuthenticateStep} from 'aurelia-authentication';
import routes from './routes';

export class App {

    constructor() {
    }

    configureRouter(config, router) {
        this.router = router;

        config.title = 'Bizhub';
        config.options.pushState = true;
        config.options.root = '/';

        config.addPipelineStep('authorize', AuthenticateStep);

        config.map(routes);

        config.mapUnknownRoutes('not-found');
    }
}
