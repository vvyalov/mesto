import { FormValidator } from '../components/FormValidator'
import { Card } from '../components/Card.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithDelete } from '../components/PopupWithDelete'
import { UserInfo } from '../components/UserInfo.js'
import '../pages/index.css';
import { Api } from '../components/Api'

const popupOpenButtonProfileForm = document.querySelector('.profile__edit-button');
const popupOpenButtonCardsForm = document.querySelector('.profile__add-button');
const popupOpenButtonAvatar = document.querySelector('.profile__button')
const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');
const avatarPopup = document.querySelector('.avatar-popup')
const avatarInput = avatarPopup.querySelector('.popup__input_type_link')
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const photoPopupSelector = '.photo-popup'
let cardForDelete
let id

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
const editAvatarValidator = new FormValidator(optionValidity, avatarPopup)

editProfileValidator.enableValidation()
editCardValidator.enableValidation()
editAvatarValidator.enableValidation()

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: '26eb0ee4-0eb7-4b00-b983-4f5e5dfe8770',
    'Content-Type': 'application/json'
  }
});

const popupImage = new PopupWithImage(photoPopupSelector)

popupImage.setEventListeners()

function renderNewElement(data) {
  const card = new Card({
    data, userId: id, handleCardClick: () => {
      popupImage.open(data.name, data.link)
    },
    handleDeleteCard: () => {
      cardForDelete = card;
      newPopupDelete.open(data)
    },
    handleLikeClick: () => {
      api.addLike(data)
        .then((data) => {
          card.addLike();
          card.setLikes(data);
        })
        .catch((err) => {
          console.log(`${err}`)
        })
    },
    removeLikeClick: () =>{
      api.removeLike(data)
      .then((data) =>{
        card.removeLike()
        card.setLikes(data)
      })
      .catch((err) => {
        console.log(`${err}`)
      })
    }
  }, '.elements-template')
  return card.getNewElement()
}

const userInfo = new UserInfo({ 
  nameSelector: '.profile__title',
  jobSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
  })

const newPopupProfile = new PopupWithForm('.profile-popup', {
  handleFormSubmit: (form) => {
    newPopupProfile.saveButtonText(true)
    api.setUserInfo(form)
      .then((res) => {
    userInfo.setUserInfo(res)
      })
      .catch((err) => {
        console.log(`${err}`)
      })
      .finally(() =>{
        newPopupProfile.saveButtonText(false)
      })
  },
}) 
newPopupProfile.setEventListeners()

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([initialInfo, initialCards]) => {
    userInfo.setUserInfo(initialInfo);
    userInfo.setUserAvatar(initialInfo);
    id = initialInfo._id;
    newSection.renderItems(initialCards);
  })

const newSection = new Section({ 
  renderer: (initialCards) => {
    const card = renderNewElement(initialCards);
    newSection.addItem(card);
  }
}, '.card')


const newPopupCard = new PopupWithForm('.card-popup', {
  handleFormSubmit: (formData) => {
    newPopupCard.saveButtonText(true)
    api.getInitialNewCard(formData)
    .then((res) => {
    const newCard = renderNewElement(res);
    newSection.addItem(newCard);})
    .catch((err) => {
      console.log(`${err}`)
    })
    .finally(() => {
      newPopupCard.saveButtonText(false)
    })
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

const newPopupDelete = new PopupWithDelete('.delete-popup', {
  handleFormSubmit: (data) => {
    api.deleteCard(data)
    .then(() => {
      cardForDelete.deleteCard()
      newPopupDelete.close()
    })
    .catch((err) => {
      console.log(`${err}`)
    })
  }
})

newPopupDelete.setEventListeners()

const newPopupAvatar = new PopupWithForm('.avatar-popup', {
  handleFormSubmit: (data) => {
    newPopupAvatar.saveButtonText(true)
    api.newAvatar(data)
    .then((res => {
      userInfo.setUserAvatar(res);
    }))
    .catch((err) => {
      console.log(`${err}`)
    })
    .finally(() =>{
      newPopupAvatar.saveButtonText(false)
    })
  }
})

newPopupAvatar.setEventListeners()


function openPopupAvatar() {
  const userAvatar = userInfo.getUserAvatar()
  avatarInput.value = userAvatar
  editAvatarValidator.removeButtonDisabled()
  newPopupAvatar.open()
}


popupOpenButtonCardsForm.addEventListener('click', openPopupCards);
popupOpenButtonProfileForm.addEventListener('click', openPopupProfile);
popupOpenButtonAvatar.addEventListener('click', openPopupAvatar)