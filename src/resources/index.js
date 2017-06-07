export function configure(config) {
  config
  .globalResources('./value-converters/date-format')
  .globalResources('./components/pager/index');
}
