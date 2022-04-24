export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items
        this._renderer = renderer
        this._container = document.querySelector(containerSelector)  
    }

    addItem(card) {
        const rendererCard = this._renderer(card);
        this._container.prepend(rendererCard);
    }


    renderItems() {
        this._items.forEach((item) => {
            this.addItem(item);
        });
    }
}