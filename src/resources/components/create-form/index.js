import { inject, bindable, bindingMode } from "aurelia-framework"
import { ValidationRules, ValidationControllerFactory } from "aurelia-validation"

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

    bind() {
        this.formElements = Object.keys(this.schema.properties).map(key => ({
            id: key,
            title: this.schema.properties[key].title,
            required: this.schema.properties[key].required,
            pattern: this.schema.properties[key].pattern,
        }))

        this.rules = this.formElements
        .filter(elem => elem.required)
        .map(
            (elem) => {
                let builder = ValidationRules.ensure(elem.id)
                    .displayName(elem.title).required()
                if (elem.pattern) {
                    builder = builder.matches(new RegExp(elem.pattern))
                }
                return builder.rules
            },
        )
        .reduce((prev, curr) => prev.concat(curr))
    }

    validate() {
        this.controller.validate({ object: this.model, rules: this.rules })
        .then((result) => {
            if (result.valid) {
                this.element.dispatchEvent(new Event("submit", {
                    bubbles: true,
                }))
            }
        })
    }
}
