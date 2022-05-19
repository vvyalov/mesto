export class Popup {
  constructor (popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this._escClose = this._handleEscClose.bind(this);
    this._overlayClose = this._handleOverlayClose.bind(this)
  }

open() {
    this.popup.classList.add('popup_open')
    document.addEventListener('keydown', this._escClose);
};

close() {
  this.popup.classList.remove('popup_open')
  document.removeEventListener('keydown', this._escClose);
};

setEventListeners() {
  this.popup.addEventListener('click', this._overlayClose);
}



_handleEscClose(evt) {
    if (evt.key === 'Escape') {
        this.close()
    }
};

_handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup_open')|| evt.target.classList.contains('popup__button_type_close')) {
        this.close()
    }
  }
}