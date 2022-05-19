import {Popup} from './Popup.js'

export class PopupWithForm extends Popup {
  constructor (popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this.popup.querySelector('.popup__form');
    this._formInput = this._form.querySelectorAll('.popup__input');
    this._saveButton = this._form.querySelectorAll('.popup__button_type_save');
  }

  _getInputValues(){
    const inputValues = {}
    this._formInput.forEach(input => {
      inputValues[input.name] = input.value
    });
    return inputValues;
  }

  setEventListeners(){
    super.setEventListeners()
    this._form.addEventListener('submit',  (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  saveButtonText(data) {
    if (data) {
      this._saveButton.textContent = 'Сохранение...'
    } else {
      this._saveButton.textContent = 'Сохранение';
    }
  }

  close(){
    this._form.reset()
    super.close()
  }
}