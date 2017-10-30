import { PLATFORM } from "aurelia-pal"

export default [
    {
        route: ["", "home"],
        name: "home",
        title: "Home",
        moduleId: PLATFORM.moduleName("home/index"),
    },
    {
        route: "organizations",
        name: "organizations",
        title: "Organizations",
        moduleId: PLATFORM.moduleName("organizations/index"),
        nav: true,
    },
    {
        route: "offices/new",
        name: "officeNew",
        moduleId: PLATFORM.moduleName("offices/new"),
    },
    {
        route: "time-entries",
        name: "time-entries",
        title: "Time Entries",
        moduleId: PLATFORM.moduleName("time-entries/index"),
        nav: true,
        auth: true,
    },
    {
        route: "invoices",
        name: "invoices",
        title: "Invoices",
        moduleId: PLATFORM.moduleName("invoices/index"),
        nav: true,
        auth: true,
    },
    {
        route: "login",
        name: "login",
        title: "Login",
        moduleId: PLATFORM.moduleName("account/signin"),
        nav: false,
    },
    {
        route: "register",
        name: "register",
        title: "Register",
        moduleId: PLATFORM.moduleName("account/signup"),
        nav: false,
    },
    {
        route: "logout",
        name: "logout",
        title: "Logout",
        moduleId: PLATFORM.moduleName("account/logout"),
        nav: false,
    },
    {
        route: "callback",
        name: "callback",
        moduleId: PLATFORM.moduleName("account/callback"),
    },
]
