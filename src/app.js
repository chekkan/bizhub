import {Router, RouterConfiguration} from 'aurelia-router';

export class App {

  constructor() {
  }

  configureRouter(config, router) {
    this.router = router;

    config.title = 'Bizhub';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      { 
        route: ['', 'home'], 
        name: 'home', 
        moduleId: 'home/index'
      },
      {
        route: 'timesheets', 
        name: 'timesheets', 
        moduleId: 'timesheets/index',
        title: 'Timesheets',
        nav: true 
      }
    ]);

    config.mapUnknownRoutes('not-found');
  }
}
