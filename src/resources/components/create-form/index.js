import { inject, bindable, bindingMode } from "aurelia-framework"
import { ValidationControllerFactory } from "aurelia-validation"
import Helper from "./helper"

@inject(ValidationControllerFactory, Element)
export class CreateFormCustomElement {
    @bindable schema;
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    model;

    constructor(controllerFactory, element) {
        this.rules = []
        this.controller = controllerFactory.createForCurrentScope()
        this.element = element
    }

    bind(bindingContext) {
        Helper.constructElements(this.schema, bindingContext)
            .then((elements) => {
                this.formElements = elements
            }).then(() => Helper.constructRules(this.formElements))
            .then((rules) => {
                this.rules = rules
            })
    }

    validate() {
        this.controller
            .validate({ object: this.model, rules: this.rules })
            .then((result) => {
                if (result.valid) {
                    this.element.dispatchEvent(
                        new Event("submit", {
                            bubbles: true,
                        }))
                }
            })
    }
}
