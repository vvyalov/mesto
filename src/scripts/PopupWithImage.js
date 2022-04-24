import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._imageCard = popupSelector.querySelector('.popup__image')
    this._textImage = popupSelector.querySelector('.popup__text')
  }

  open(name, link){
    this._imageCard.src = link
    this._imageCard.alt = name
    this._textImage.textContent = name
    super.open()
  }
}