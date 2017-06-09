import {bindable, bindingMode} from 'aurelia-framework';

export class CreateFormCustomElement {

    @bindable schema;
    @bindable({defaultBindingMode: bindingMode.twoWay}) model;
    
    constructor(element) {
        this.element = element;
    }
}
