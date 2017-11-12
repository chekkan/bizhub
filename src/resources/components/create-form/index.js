import { inject, bindable, bindingMode, BindingEngine } from "aurelia-framework"
import { ValidationControllerFactory } from "aurelia-validation"
import Helper from "./helper"

@inject(ValidationControllerFactory, Element, BindingEngine)
export class CreateFormCustomElement {
    @bindable schema;
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    model;

    constructor(controllerFactory, element, bindingEngine) {
        this.rules = []
        this.controller = controllerFactory.createForCurrentScope()
        this.element = element
        this.bindingEngine = bindingEngine
    }

    bind(bindingContext) {
        this.bindingContext = bindingContext
        Helper.constructElements(this.schema, this.bindingContext)
            .then((elements) => {
                this.formElements = elements
                this.subscriptions = this.getSubscriptions()
            }).then(() => Helper.constructRules(this.formElements))
            .then((rules) => {
                this.rules = rules
            })
    }

    getSubscriptions() {
        return this.formElements.filter(c => c.childOf)
        .map((el) => {
            const propertyName = `${el.childOf}.id`
            return this.bindingEngine.expressionObserver(this.model, propertyName)
            .subscribe((newValue, oldValue) =>
                this.modelPropertyChanged(propertyName, el.id, newValue, oldValue))
        })
    }

    detached() {
        this.subscriptions.forEach((subscription) => {
            subscription.dispose()
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
            .then(() => {
            })
    }

    modelPropertyChanged(propertyName, childElementId, newValue, oldValue) {
        console.log(`${propertyName}: ${oldValue} => ${newValue}`)
        if (oldValue) {
            const self = this
            this.bindingContext.offices(newValue).then((options) => {
                self.formElements.filter(el => el.id === childElementId)
                .forEach((office) => {
                    Object.assign(office, { options })
                })
            })
        }
    }
}
