import {App} from '../../src/app';

class RouterStub {
    constructor() {
        this.options = {};
    }

    configure(handler) {
        handler(this);
    }

    map(routes) {
        this.routes = routes;
    }

    mapUnknownRoutes(route) {
        this.unKnownRoute = route;
    }

    addPipelineStep(){}
}

describe('the App module', () => {
    var sut;
    var mockedRouter;

    beforeEach(() => {
        mockedRouter = new RouterStub();
        sut = new App();
        sut.configureRouter(mockedRouter, mockedRouter);
    });

    it('contains a router property', () => {
        expect(sut.router).toBeDefined();
    });

    it('configures the router title', () => {
        expect(sut.router.title).toEqual('Bizhub');
    });

    it('should have a home route', () => {
        expect(sut.router.routes).toContain({
            route: ['', 'home'],
            name: 'home',
            title: 'Home',
            moduleId: 'home/index'
        });
    });

    it('should have a timesheets route', () => {
        expect(sut.router.routes).toContain({
            route: 'timesheets',
            name: 'timesheets',
            moduleId: 'timesheets/index',
            nav: true,
            title: 'Timesheets',
            auth: true
        });
    });

    it('should have a not-found route', () => {
        expect(sut.router.unKnownRoute).toEqual('not-found');
    });

});
