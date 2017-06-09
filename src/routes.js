export default [
    {
        route: ['', 'home'],
        name: 'home',
        title: 'Home',
        moduleId: 'home/index'
    },
    {
        route: 'timesheets',
        name: 'timesheets',
        moduleId: 'timesheets/index',
        title: 'Timesheets',
        nav: true,
        auth: true
    },
    {
        route: 'organizations',
        name: 'organizations',
        moduleId: 'organizations/index',
        title: 'Organizations',
        nav: true
    },
    {
        route: 'organizations/new',
        name: 'organizationNew',
        moduleId: 'organizations/new'
    },
    {
        route: 'organizations/:id',
        name: 'organizationDetail',
        moduleId: 'organizations/detail'
    },
    {
        route: 'login',
        name: 'login',
        moduleId: 'account/login',
        title: 'Login'
    },
    {
        route: 'register',
        name: 'register',
        moduleId: 'account/register',
        title: 'Register'
    },
    {
        route: 'logout',
        name: 'logout',
        moduleId: 'account/logout',
        title: 'Logout'
    }
]
