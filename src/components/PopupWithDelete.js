import {Popup} from './Popup.js'

export class PopupWithDelete extends Popup {
  constructor (popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this.popup.querySelector('.popup__form');
    this._submitBind = this._submitEvent.bind(this)
  }


  _submitEvent(event) {
    event.preventDefault();
    this._handleFormSubmit(this._data);
  }

  setEventListeners(){
    this._form.addEventListener('submit',  this._submitBind);
    super.setEventListeners();
  }

  open(data){
    this._data = data;
    super.open()
  }
}