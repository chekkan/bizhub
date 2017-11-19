import { PLATFORM } from "aurelia-pal"
// import {DateFormatValueConverter} from './value-converters/date-format'
// import {KeysValueConverter} from './value-converters/keys'
// import {PagerCustomElement} from './components/pager'
// import {CreateFormCustomElement} from './components/create-form'

export function configure(config) {
    config
  .globalResources(PLATFORM.moduleName("./value-converters/date-format"))
  .globalResources(PLATFORM.moduleName("./value-converters/number-format"))
  .globalResources(PLATFORM.moduleName("./value-converters/keys"))
  .globalResources(PLATFORM.moduleName("./value-converters/auth-filter"))
  .globalResources(PLATFORM.moduleName("./value-converters/filter-value"))
  .globalResources(PLATFORM.moduleName("./components/pager/index"))
  .globalResources(PLATFORM.moduleName("./components/create-form/index"))
  .globalResources(PLATFORM.moduleName("./components/time-entry-card/time-entry-card.html"))
  .globalResources(PLATFORM.moduleName("./components/sign-up/index"))
  .globalResources(PLATFORM.moduleName("./components/sign-in/index"))
}

// export {DateFormatValueConverter}
export * from "./value-converters/date-format"
export * from "./value-converters/number-format"
export * from "./value-converters/keys"
export * from "./value-converters/auth-filter"
export * from "./value-converters/filter-value"
export * from "./components/pager"
export * from "./components/create-form"
export * from "./components/time-entry-card/time-entry-card.html"
export * from "./components/sign-up"
export * from "./components/sign-in"
