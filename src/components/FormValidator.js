export class FormValidator {
    constructor(validate, form) {
        this._form = form
        this._validate = validate
        this._buttonElement = this._form.querySelector(this._validate.submitButtonSelector);
        this._inputList = Array.from(this._form.querySelectorAll(this._validate.inputSelector));
    }

    _showError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._validate.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._validate.errorClassActive);
    };

    _hideError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._validate.inputErrorClass);
        errorElement.classList.remove(this._validate.errorClassActive);
        errorElement.textContent = '';
    };

    _checkValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showError(inputElement, inputElement.validationMessage);
        } else {
            this._hideError(inputElement);
        }
    };

    _hasValidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    disableSubmitButton() {
        this._buttonElement.setAttribute('disabled', true)
        this._buttonElement.classList.add(this._validate.inactiveButtonClass);
    }

    removeButtonDisabled() {
        this._buttonElement.removeAttribute('disabled')
        this._buttonElement.classList.remove(this._validate.inactiveButtonClass);
    }

    _toggleButtonState(inputList) {
        if (this._hasValidInput(inputList)) {
            this.disableSubmitButton()
        }
        else {
            this.removeButtonDisabled()
        }
    }

    _setEventListeners = () => {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkValidity(inputElement);
                this._toggleButtonState(this._inputList);
            });
        });
    };

    enableValidation() {
        this._setEventListeners();
    };
}

