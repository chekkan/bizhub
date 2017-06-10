import {PLATFORM} from 'aurelia-pal'
// import {DateFormatValueConverter} from './value-converters/date-format'
// import {KeysValueConverter} from './value-converters/keys'
// import {PagerCustomElement} from './components/pager'
// import {CreateFormCustomElement} from './components/create-form'

export function configure(config) {
  config
  .globalResources(PLATFORM.moduleName('./value-converters/date-format'))
  .globalResources(PLATFORM.moduleName('./value-converters/keys'))
  .globalResources(PLATFORM.moduleName('./components/pager/index'))
  .globalResources(PLATFORM.moduleName('./components/create-form/index'));
}

// export {DateFormatValueConverter}
export * from './value-converters/date-format'
export * from './value-converters/keys'
export * from './components/pager'
export * from './components/create-form'
