import { PLATFORM } from "aurelia-pal"

export function configure(config) {
    config
  .globalResources(PLATFORM.moduleName("./value-converters/date-format"))
  .globalResources(PLATFORM.moduleName("./value-converters/number-format"))
  .globalResources(PLATFORM.moduleName("./value-converters/keys"))
  .globalResources(PLATFORM.moduleName("./value-converters/auth-filter"))
  .globalResources(PLATFORM.moduleName("./value-converters/filter-value"))
  .globalResources(PLATFORM.moduleName("./elements/pager"))
  .globalResources(PLATFORM.moduleName("./components/create-form/index"))
  .globalResources(PLATFORM.moduleName("./components/time-entry-card/time-entry-card.html"))
  .globalResources(PLATFORM.moduleName("./components/sign-up/index"))
  .globalResources(PLATFORM.moduleName("./components/sign-in/index"))
}
