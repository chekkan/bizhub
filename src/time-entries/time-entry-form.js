import { bindable, bindingMode, inject } from "aurelia-framework"

@inject(Element)
export class TimeEntryFormCustomElement {
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    model = {}
    element = null

    constructor(element) {
        this.element = element
    }

    remove() {
        const event = new CustomEvent("remove", {
            bubbles: true,
        })
        this.element.dispatchEvent(event)
    }
}
