export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items
        this._renderer = renderer
        this._container = document.querySelector(containerSelector)  
    }

    addItem(card) {
        this._container.prepend(card);
    }


    renderItems() {
        this._items.forEach(item => {
            this.addItem(this._renderer(item));
        });
    }
}