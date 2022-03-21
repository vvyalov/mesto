const enableValidation = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  popupFieldset: '.popup__info',
  submitButtonSelector: '.popup__button_type_save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error',
  errorClassActive: 'popup__error_active',
}); 

const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(enableValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(enableValidation.errorClassActive);
};



const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(enableValidation.inputErrorClass);
  errorElement.classList.remove(enableValidation.errorClassActive);
  errorElement.textContent = '';
};

const checkValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));
  const buttonElement = formElement.querySelector(enableValidation.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const validityState = () => {
  const formList = Array.from(document.querySelectorAll(enableValidation.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(enableValidation.popupFieldset));
fieldsetList.forEach((fieldSet) => {
  setEventListeners(fieldSet);
}); 
  });
 };

 validityState();

function toggleButtonState (inputList, buttonElement) {
  if (hasValidInput(inputList)) {
    buttonElement.setAttribute('disabled', true)
    buttonElement.classList.add(enableValidation.inactiveButtonClass);
  }
  else {
    buttonElement.removeAttribute('disabled')
    buttonElement.classList.remove(enableValidation.inactiveButtonClass);
  }
}

function hasValidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
}); 
}