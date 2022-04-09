export class FormValidator {
    constructor(validate, form) {
        this._form = form
        this._validate = validate
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

    disableSubmitButton(buttonElement) {
        buttonElement.setAttribute('disabled', true)
        buttonElement.classList.add(this._validate.inactiveButtonClass);
    }

    removeButtonDisabled(buttonElement) {
        buttonElement.removeAttribute('disabled')
        buttonElement.classList.remove(this._validate.inactiveButtonClass);
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasValidInput(inputList)) {
            this.disableSubmitButton(buttonElement)
        }
        else {
            this.removeButtonDisabled(buttonElement)
        }
    }

    _setEventListeners = () => {
        const inputList = Array.from(this._form.querySelectorAll(this._validate.inputSelector));
        const buttonElement = this._form.querySelector(this._validate.submitButtonSelector);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };

    enableValidation() {
        this._setEventListeners();
    };
}

