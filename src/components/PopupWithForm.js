import {Popup} from './Popup.js'

export class PopupWithForm extends Popup {
  constructor (popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this.popup.querySelector('.popup__form');
    this._formInput = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues(){
    const inputValues = {};
    this._formInput.forEach(input => {
      inputValues[input.name] = input.values
    });
    return inputValues;
  }

  setEventListeners(){
    super.setEventListeners()
    this._form.addEventListener('submit',  (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close(){
    this._form.reset()
    super.close()
  }
}