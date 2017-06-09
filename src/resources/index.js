export function configure(config) {
  config
  .globalResources('./value-converters/date-format')
  .globalResources('./value-converters/keys')
  .globalResources('./components/pager/index')
  .globalResources('./components/create-form/index');
}
