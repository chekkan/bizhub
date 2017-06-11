import { inject, bindable, bindingMode } from "aurelia-framework"
import { ValidationRules, ValidationControllerFactory } from "aurelia-validation"

@inject(ValidationControllerFactory)
export class CreateFormCustomElement {
  @bindable schema;
  @bindable({ defaultBindingMode: bindingMode.twoWay })
    model;

    constructor(controllerFactory) {
        this.rules = []
        this.controller = controllerFactory.createForCurrentScope()
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
}
