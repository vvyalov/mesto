import { FormValidator } from '../components/FormValidator'
import { Card } from '../components//Card.js'
import { photoPopup } from '../components//utils.js'
import { Section } from '../components//Section.js'
import { PopupWithImage } from '../components//PopupWithImage.js'
import { PopupWithForm } from '../components//PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'
import '../pages/index.css';

const popupOpenButtonProfileForm = document.querySelector('.profile__edit-button');
const popupOpenButtonCardsForm = document.querySelector('.profile__add-button');
const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const photoPopupSelector = '.photo-popup'




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

const popupImage = new PopupWithImage(photoPopupSelector)

popupImage.setEventListeners()

function renderNewElement(data) {
  const card = new Card({
    data, handleCardClick: () => {
      popupImage.open(data.name, data.link)
    }
  }, '.elements-template')
  return card.getNewElement()
}

const userInfo = new UserInfo({ 
  nameSelector: '.profile__title',
  jobSelector: '.profile__subtitle',
  })



const newPopupProfile = new PopupWithForm('.profile-popup', {
  handleFormSubmit: (form) => {
    const set = userInfo.setUserInfo(form)
  },
}) 
newPopupProfile.setEventListeners()

const newSection = new Section({
  items: initialCards, 
  renderer: (initialCards) => {
    const cards = renderNewElement(initialCards);
    return cards
  }
}, '.card')



const newPopupCard = new PopupWithForm('.card-popup', {
  handleFormSubmit: () => {
    const newCard = renderNewElement(newSection);
    newSection.addItem(newCard);
  }
})

newPopupCard.setEventListeners()

function openPopupProfile() {
  const user = userInfo.getUserInfo();
  nameInput.value = user.nameProfile;
  jobInput.value = user.jobProfile;
  editProfileValidator.removeButtonDisabled();
  newPopupProfile.open();
}


function openPopupCards() {
  editCardValidator.disableSubmitButton()
  newPopupCard.open()
}

newSection.renderItems()


popupOpenButtonCardsForm.addEventListener('click', openPopupCards);
popupOpenButtonProfileForm.addEventListener('click', openPopupProfile);