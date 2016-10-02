import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
// import {AuthService} from 'aurelia-authentication';
// import {HttpClient} from 'aurelia-fetch-client';
// import {Configure} from 'aurelia-configuration';

//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    // .plugin('aurelia-configuration', config => {
    //     config.setEnvironments({
    //         development: ['localhost'],
    //         production: ['bizhub.io']
    //     });
    // })
    // .plugin('aurelia-authentication', baseConfig => {
    //     // let configInstance = aurelia.container.get(Configure);
    //     // baseConfig.configure(configInstance);
    // })
    .feature('resources');

    // let configInstance = aurelia.container.get(Configure);

    // if (configInstance.get('debug')) {
        aurelia.use.developmentLogging();
    // }

    // if (configInstance.get('testing')) {
        //aurelia.use.plugin('aurelia-testing');
    // }

    // configureContainer(aurelia.container);

    aurelia.start().then(() => aurelia.setRoot());
}

// function configureContainer(container) {
//   let http = new HttpClient();
//   http.configure(conf => {
//     conf
//       .useStandardConfiguration()
//       .withBaseUrl('http://localhost:5000')
//       .withInterceptor({
//           request(request) {
//             let authService = container.get(AuthService);
//             let accessToken = authService.getAccessToken();
//             if(accessToken === undefined) {
//                 return request;
//             }
//             let authHeader = 'Bearer ' + accessToken;
//             request.headers.append('Authorization', authHeader);
//             return request;
//           }
//       });
//   });
//   container.registerInstance(HttpClient, http);
// }
