const container = document.querySelector('.page')
const popupOpenButtonProfileForm = document.querySelector('.profile__edit-button')
const popupOpenButtonCardsForm = document.querySelector('.profile__add-button')
const profilePopup = document.querySelector('.profile-popup')
const cardPopup = document.querySelector('.card-popup')
const photoPopup = document.querySelector('.photo-popup')
const popupCloseButtonFormProfile = profilePopup.querySelector('.popup__button_type_close')
const popupCloseButtonFormCard = cardPopup.querySelector('.popup__button_type_close')
const popupCloseButtonPhoto = photoPopup.querySelector('.popup__button_type_close')
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')
const titleInput = document.querySelector('.popup__input_type_title')
const linkInput = document.querySelector('.popup__input_type_link')
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_job')
const imageCard = document.querySelector('.popup__image')
const textImage = document.querySelector('.popup__text')
const elementsCard = document.querySelector('.card')
const cardTemplate = document.querySelector('.elements-template').content


function renderNewElement(name, link) {
  const elementCard = cardTemplate.querySelector('.element').cloneNode(true)
  const elementName = elementCard.querySelector('.element__text')
  const elementImage = elementCard.querySelector('.element__image')
  elementImage.addEventListener('click', (evt) => {
    imageCard.src = evt.target.src
    imageCard.alt = evt.target.alt
    textImage.textContent = evt.target.alt
    openPopup(photoPopup)
  })
  elementCard.querySelector('.element__delete').addEventListener('click', deleteElement)
  elementCard.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active')
  })
  elementName.textContent = name
  elementImage.src = link
  elementImage.alt = name

  return elementCard
}

initialCards.forEach((card) => {
  const newElement = renderNewElement(card.name, card.link)
  elementsCard.append(newElement)

})

function deleteElement(evt) {
  const deleteCard = evt.target.closest('.element')
  deleteCard.remove()
}


function openPopup(popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', closeEsc);
  document.addEventListener('click', closeOverlay);
};

function closePopup(popup) {
  popup.classList.remove('popup_open')
  document.removeEventListener('keydown', closeEsc);
  document.removeEventListener('click', closeOverlay);
};


function closeEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_open'))
  }
};

function closeOverlay(evt) {
  if (evt.target.classList.contains('popup_open')) {
    closePopup(evt.target);
  }
}

function openPopupProfile() {
  openPopup(profilePopup)
  nameInput.value = profileTitle.textContent
  jobInput.value = profileSubtitle.textContent
  const saveButton = profilePopup.querySelector('.popup__button_type_save')
  removeButtonDisabled(saveButton)
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(profilePopup)
}


function openPopupCards() {
  openPopup(cardPopup)
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const popupFormCard = cardPopup.querySelector('.popup__form')
  const saveButton = cardPopup.querySelector('.popup__button_type_save')
  const title = titleInput.value
  const link = linkInput.value
  const newCard = renderNewElement(title, link)
  elementsCard.prepend(newCard)
  closePopup(cardPopup)
  popupFormCard.reset()
  buttonDisabled(saveButton)
}


popupOpenButtonCardsForm.addEventListener('click', openPopupCards);
popupOpenButtonProfileForm.addEventListener('click', openPopupProfile);
popupCloseButtonFormProfile.addEventListener('click', () => closePopup(profilePopup));
popupCloseButtonFormCard.addEventListener('click', () => closePopup(cardPopup));
popupCloseButtonPhoto.addEventListener('click', () => closePopup(photoPopup))

profilePopup.addEventListener('submit', handleProfileFormSubmit);
cardPopup.addEventListener('submit', handleCardFormSubmit);
