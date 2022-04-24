import { FormValidator } from './FormValidator.js'
import { Card } from './Card.js'
import { photoPopup } from './utils.js'
import { Section } from './Section.js'
import { PopupWithImage } from './PopupWithImage.js'
import { PopupWithForm } from './PopupWithForm.js'
import { UserInfo } from './UserInfo.js'
import '../pages/index.css';

const popupOpenButtonProfileForm = document.querySelector('.profile__edit-button')
const popupOpenButtonCardsForm = document.querySelector('.profile__add-button')
const profilePopup = document.querySelector('.profile-popup')
const cardPopup = document.querySelector('.card-popup')
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')
const titleInput = document.querySelector('.popup__input_type_title')
const linkInput = document.querySelector('.popup__input_type_link')
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_job')




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

const popupImage = new PopupWithImage(photoPopup)

function renderNewElement(data) {
  
  const card = new Card({
    data, handleCardClick: () => {
      popupImage.open(data.name, data.link)
    }
  }, '.elements-template')
  return card
}

const userInfo = new UserInfo({ 
  nameSelector: '.profile__title',
  jobSelector: '.profile__subtitle' 
})



const newPopupProfile = new PopupWithForm(profilePopup, {
  handleFormSubmit: (form) => {
    userInfo.setUserInfo(form);
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
  }
}) 


const newPopupCard = new PopupWithForm(cardPopup, {
  handleFormSubmit: () => {
    const newnewCard = {
    name: titleInput.value,
    link: linkInput.value,
   }
    newCard.addItem(newnewCard);
  }
})

function openPopupProfile() {
  const user = userInfo.getUserInfo();
  nameInput.value = user.nameProfile;
  jobInput.value = user.jobProfile;
  editProfileValidator.removeButtonDisabled();
  newPopupProfile.open();
}


const newCard = new Section({
  items: initialCards, 
  renderer: (initialCards) => {
    const cards = renderNewElement(initialCards);
    const newCardRenderer = cards.getNewElement();
    return newCardRenderer
  }
}, '.card')

console.log()


function openPopupCards() {
  editCardValidator.disableSubmitButton()
  newPopupCard.open()
}

newCard.renderItems()


popupOpenButtonCardsForm.addEventListener('click', openPopupCards);
popupOpenButtonProfileForm.addEventListener('click', openPopupProfile);