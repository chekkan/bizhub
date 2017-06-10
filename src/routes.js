import {PLATFORM} from 'aurelia-pal'

export default [
    {
        route: ['', 'home'],
        name: 'home',
        title: 'Home',
        moduleId: PLATFORM.moduleName('home/index')
    },
    {
        route: 'timesheets',
        name: 'timesheets',
        moduleId: PLATFORM.moduleName('timesheets/index'),
        title: 'Timesheets',
        nav: true,
        auth: true
    },
    {
        route: 'organizations',
        name: 'organizations',
        moduleId: PLATFORM.moduleName('organizations/index'),
        title: 'Organizations',
        nav: true
    },
    {
        route: 'organizations/new',
        name: 'organizationNew',
        moduleId: PLATFORM.moduleName('organizations/new')
    },
    {
        route: 'organizations/:id',
        name: 'organizationDetail',
        moduleId: PLATFORM.moduleName('organizations/detail')
    },
    {
        route: 'login',
        name: 'login',
        moduleId: PLATFORM.moduleName('account/login'),
        title: 'Login'
    },
    {
        route: 'register',
        name: 'register',
        moduleId: PLATFORM.moduleName('account/register'),
        title: 'Register'
    },
    {
        route: 'logout',
        name: 'logout',
        moduleId: PLATFORM.moduleName('account/logout'),
        title: 'Logout'
    }
]
