import { bindable, bindingMode } from "aurelia-framework"

export class CreateFormCustomElement {

    @bindable schema;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) model;

    constructor(element) {
        this.element = element
    }

    bind() {
        this.formElements = Object.keys(this.schema.properties)
            .map(key => ({
                id: key,
                title: this.schema.properties[key].title,
                required: this.schema.properties[key].required,
            }))
    }
}
