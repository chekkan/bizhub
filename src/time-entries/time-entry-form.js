import { bindable, bindingMode } from "aurelia-framework"

export class TimeEntryFormCustomElement {
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    model = {}
}
