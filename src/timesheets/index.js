export class Index {

  constructor() {
    this.addFormEnabled = false;
    this.selectedItems = [];
  }

  toggleAddForm() {
    this.addFormEnabled = !this.addFormEnabled;
  }
}
