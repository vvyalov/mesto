export class Popup {
  constructor (popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this._closeButton = this.popup.querySelector('.popup__button_type_close');
    this._closePopupAdd = this._closePopup.bind(this);
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
  document.addEventListener('click', this._closePopupAdd)  
  document.addEventListener('click', this._overlayClose);
}

removeEventListener() {
  document.removeEventListener('click', this._closePopupAdd)
  document.removeEventListener('click', this._overlayClose);
}

_closePopup(evt) {
  if (evt.target === this._closeButton) {
    this.close()
  }
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