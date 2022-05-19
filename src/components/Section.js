export class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer
        this._container = document.querySelector(containerSelector)  
    }

    addItem(card) {
        this._container.prepend(card);
    }



    renderItems(data) {
        data.forEach((item) => {
            this._renderer(item);
        });
    }
}