import {Popup} from './Popup.js'

export class PopupWithForm extends Popup {
  constructor (popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = popupSelector.querySelector('.popup__form');
    this._formInput = this._form.querySelectorAll('.popup__input');
    console.log(this._formInput)
    this._form.addEventListener('submit',  (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      console.log(this._getInputValues())
      this.close();
      console.log('submit')
    });
  }


  _getInputValues(){
    this._inputValues = {};
    this._formInput.forEach((input) => {
      this._inputValues[input.name] = input.values
      console.log(input)
    });
    return this._inputValues;
  }

  close(){
    this._form.reset()
    super.close()
  }
}