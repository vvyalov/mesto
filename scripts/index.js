import { FormValidator } from './FormValidator.js'
import { Card } from './Card.js'
import { openPopup, closePopup, photoPopup } from './utils.js'

const popupOpenButtonProfileForm = document.querySelector('.profile__edit-button')
const popupOpenButtonCardsForm = document.querySelector('.profile__add-button')
const profilePopup = document.querySelector('.profile-popup')
const cardPopup = document.querySelector('.card-popup')
const popupCloseButtonFormProfile = profilePopup.querySelector('.popup__button_type_close')
const popupCloseButtonFormCard = cardPopup.querySelector('.popup__button_type_close')
const popupCloseButtonPhoto = photoPopup.querySelector('.popup__button_type_close')
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')
const titleInput = document.querySelector('.popup__input_type_title')
const linkInput = document.querySelector('.popup__input_type_link')
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_job')
const elementsCard = document.querySelector('.card')

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const optionValidity = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_type_save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error',
  errorClassActive: 'popup__error_active',
});

const editProfileValidator = new FormValidator(optionValidity, profilePopup)
const editCardValidator = new FormValidator(optionValidity, cardPopup)

editProfileValidator.enableValidation()
editCardValidator.enableValidation()

function renderNewElement(data) {
  const card = new Card(data, '.elements-template')
  return card.getNewElement()
}

initialCards.forEach((card) => {
  elementsCard.append(renderNewElement(card))
})


function openPopupProfile() {
  const saveButton = profilePopup.querySelector('.popup__button_type_save')
  openPopup(profilePopup)
  nameInput.value = profileTitle.textContent
  jobInput.value = profileSubtitle.textContent
  editProfileValidator.removeButtonDisabled(saveButton)
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(profilePopup)
}


function openPopupCards() {
  openPopup(cardPopup)
  const saveButton = cardPopup.querySelector('.popup__button_type_save')
  editCardValidator.disableSubmitButton(saveButton)
}


function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const popupFormCard = cardPopup.querySelector('.popup__form')
  const newCard = {
  name: titleInput.value,
  link: linkInput.value,
  }
  elementsCard.prepend(renderNewElement(newCard))
  closePopup(cardPopup)
  popupFormCard.reset()
}


popupOpenButtonCardsForm.addEventListener('click', openPopupCards);
popupOpenButtonProfileForm.addEventListener('click', openPopupProfile);
popupCloseButtonFormProfile.addEventListener('click', () => closePopup(profilePopup));
popupCloseButtonFormCard.addEventListener('click', () => closePopup(cardPopup));
popupCloseButtonPhoto.addEventListener('click', () => closePopup(photoPopup))

profilePopup.addEventListener('submit', handleProfileFormSubmit);
cardPopup.addEventListener('submit', handleCardFormSubmit);
