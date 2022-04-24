export class Popup {
  constructor (popupSelector) {
    this._selector = popupSelector
    this._closeButton = this._selector.querySelector('.popup__button_type_close');
    this._closePopup = this.close.bind(this);
    this._escClose = this._handleEscClose.bind(this);
    this._overlayClose = this._handleOverlayClose.bind(this)
  }

open() {
    this._selector.classList.add('popup_open')
    this.setEventListeners()
};

close() {
  this._selector.classList.remove('popup_open')
  this.removeEventListener()
};

setEventListeners() {
  this._closeButton.addEventListener('click', this._closePopup)
  document.addEventListener('keydown',  this._escClose);
  document.addEventListener('click', this._overlayClose);
}

removeEventListener() {
  this._closeButton.removeEventListener('click', this._closePopup)
  document.removeEventListener('keydown', this._escClose);
  document.removeEventListener('click', this._overlayClose);
}


_handleEscClose(evt) {
    if (evt.key === 'Escape') {
        this.close()
    }
};

_handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup_open')) {
        this.close()
    }
  }
}