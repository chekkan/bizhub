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
        moduleId: PLATFORM.moduleName("organizations/index"),
        title: "Organizations",
        nav: true,
    },
    {
        route: "organizations/new",
        name: "organizationNew",
        moduleId: PLATFORM.moduleName("organizations/new"),
    },
    {
        route: "organizations/:id",
        name: "organizationDetail",
        moduleId: PLATFORM.moduleName("organizations/detail"),
    },
    {
        route: "offices/new",
        name: "officeNew",
        moduleId: PLATFORM.moduleName("offices/new"),
    },
]
