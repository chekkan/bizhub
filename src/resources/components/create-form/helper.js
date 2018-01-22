import { ValidationRules } from "aurelia-validation"

export default class Helper {
    static getFormElementType(property) {
        if (property["x-form-type"]) {
            return property["x-form-type"]
        }
        if (property.properties && property.properties.id) {
            return "select"
        }
        if (property.format === "date-time") {
            return "date-time"
        }
        if (property.format === "password") {
            return "password"
        }
        if (property.type === "string") {
            return "text"
        }
        if (property.type === "integer") {
            return "integer"
        }
        if (property.type === "number") {
            return "number"
        }
        return "text"
    }

    static async getElementOptions(elem, parent, parentOption) {
        if (elem.type === "select") {
            if (parentOption && parentOption.value) {
                return parent[elem.options](parentOption.value)
            }
            return parent[elem.options]
        }
        return Promise.resolve(undefined)
    }

    static async constructElements(schema, bindingContext) {
        const elems = Object.keys(schema.properties).map(key => ({
            id: key,
            title: schema.properties[key].title,
            required: schema.properties[key].required,
            pattern: schema.properties[key].pattern,
            type: Helper.getFormElementType(schema.properties[key]),
            childOf: schema.properties[key]["x-child-of"],
            options: schema.properties[key]["x-form-options"],
            step: schema.properties[key].multipleOf,
        }))
        return Helper.populateElements(elems, bindingContext)
    }

    static async populateElements(elements, bindingContext) {
        const parentElements = elements.filter(elem => !elem.childOf)
        const elems = parentElements.map(elem => Helper.getElementOptions(
            elem,
            bindingContext,
        ).then((options) => {
            const childElements = elements.filter(el => el.childOf && el.childOf === elem.id)
            const childElemsPromises = childElements.map(el => Helper.getElementOptions(
                el, bindingContext, options[0])
                .then(childOpts => Object.assign({}, el, {
                    options: childOpts,
                })))

            return Promise.all(childElemsPromises)
                .then(childElems => [Object.assign({}, elem, {
                    options,
                }), ...childElems])
        }))
        return Promise.all(elems).then(populatedElements => [].concat(...populatedElements))
    }

    static async constructRules(elements) {
        ValidationRules.customRule(
            "integer",
            value => Number.isInteger(value),
            "${$displayName} must be an integer.",
        )
        const rules = elements
            .filter(elem => elem.required)
            .map((elem) => {
                let builder = ValidationRules.ensure(elem.id)
                    .displayName(elem.title)
                    .required()
                if (elem.pattern) {
                    builder = builder.matches(new RegExp(elem.pattern))
                }
                if (elem.type === "integer") {
                    builder.satisfiesRule("integer")
                }
                return builder.rules
            })
            .reduce((prev, curr) => prev.concat(curr))
        return Promise.resolve(rules)
    }

    static subscribePropertyChanged(elements, bindingEngine, model, modelPropertyChangedFn) {
        return bindingEngine.expressionObserver(model, "organization.id")
            .subscribe((newValue, oldValue) => modelPropertyChangedFn("organization.id", newValue, oldValue))
    }
}
