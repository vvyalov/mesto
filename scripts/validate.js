const optionValidity = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_type_save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error',
  errorClassActive: 'popup__error_active',
}); 


const showError = (formElement, inputElement, errorMessage, optionValidity) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(optionValidity.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(optionValidity.errorClassActive);
};



const hideError = (formElement, inputElement, optionValidity) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(optionValidity.inputErrorClass);
  errorElement.classList.remove(optionValidity.errorClassActive);
  errorElement.textContent = '';
};

const checkValidity = (formElement, inputElement, optionValidity) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, optionValidity);
  } else {
    hideError(formElement, inputElement, optionValidity);
  }
};

const setEventListeners = (formElement, optionValidity) => {
  const inputList = Array.from(formElement.querySelectorAll(optionValidity.inputSelector));
  const buttonElement = formElement.querySelector(optionValidity.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, optionValidity);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValidity(formElement, inputElement, optionValidity);
      toggleButtonState(inputList, buttonElement, optionValidity);
    });
  });
};

const enableValidation = (optionValidity) => {
  const formList = Array.from(document.querySelectorAll(optionValidity.formSelector));
  formList.forEach((formElement) => {
      setEventListeners(formElement, optionValidity);
  });
}

 enableValidation(optionValidity);

function toggleButtonState (inputList, buttonElement) {
  if (hasValidInput(inputList)) {
    buttonDisabled(buttonElement)
  }
  else {
    removeButtonDisabled(buttonElement)
  }
}


function buttonDisabled (buttonElement) {
  buttonElement.setAttribute('disabled', true)
  buttonElement.classList.add(optionValidity.inactiveButtonClass);
}

function removeButtonDisabled(buttonElement) {
  buttonElement.removeAttribute('disabled')
  buttonElement.classList.remove(optionValidity.inactiveButtonClass);
}

function hasValidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
}); 
}