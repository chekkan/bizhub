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
    },
]
