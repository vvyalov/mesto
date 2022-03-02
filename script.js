const container = document.querySelector('.page')
const popupOpenButtonProfileForm = document.querySelector('.profile__edit-button')
const popupOpenButtonCardsForm = document.querySelector('.profile__add-button')
const popupForm = document.querySelector('.popup')
const popupProfileForm = popupForm.querySelector('.popup__profile')
const popupCardForm = popupForm.querySelector('.popup__card')
const popupPhoto = popupForm.querySelector('.popup__photo')
const popupCloseButtonFormProfile = popupProfileForm.querySelector('.popup__button_type_close')
const popupCloseButtonFormCard = popupCardForm.querySelector('.popup__button_type_close')
const popupCloseButtonPhoto = popupPhoto.querySelector('.popup__button_type_close')
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle =  document.querySelector('.profile__subtitle')
const titleInput = document.querySelector('.popup__input_type_title')
const linkInput = document.querySelector('.popup__input_type_link')
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_job')
const elementsCard = document.querySelector('.card')
const cardTemplate = document.querySelector('.elements-template').content



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

  function renderNewElement (name, link) {
    const elementCard = cardTemplate.querySelector('.element').cloneNode(true)
    const elementName = elementCard.querySelector('.element__text')
    const elementLink = elementCard.querySelector('.element__image')
    elementLink.addEventListener('click', (evt) =>{
      const imageCard = document.querySelector('.popup__image')
      const textImage = document.querySelector('.popup__text')
      imageCard.src = evt.target.src
      textImage.textContent = evt.target.alt
      popupPhoto.querySelector('.popup__button_type_close').addEventListener('click', () =>{
        popupPhoto.classList.remove('popup_open')})
      openPopup(popupPhoto)
    })
    elementCard.querySelector('.element__delete').addEventListener('click', deleteElement)
    elementCard.querySelector('.element__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like_active')})
    elementName.textContent = name
    elementLink.src = link
    elementLink.alt = name

    return elementCard
  }

  initialCards.forEach((card) => {
    const newElement = renderNewElement(card.name, card.link)
    elementsCard.append(newElement)
    
  })

function deleteElement(evt){
    const deleteCard = evt.target.closest('.element')
    deleteCard.remove()
}


function openPopup(open) {
  popupForm.classList.add('popup_open')
  open.classList.add('popup_open')
};

function closePopup() {
  popupForm.classList.remove('popup_open')
};



function openPopupProfile() {
  popupProfileForm.querySelector('.popup__button_type_close').addEventListener('click', () =>{
    popupProfileForm.classList.remove('popup_open')})
  openPopup(popupProfileForm)
  nameInput.value = profileTitle.textContent
  jobInput.value = profileSubtitle.textContent
  handleProfileFormSubmit()
}

function handleProfileFormSubmit(){
  popupProfileForm.querySelector('.popup__button_type_save').addEventListener('click', (evt) => {
    evt.preventDefault(); 
    popupProfileForm.classList.remove('popup_open');
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup()
  })}


function openPopupCards() {
  openPopup(popupCardForm)
  titleInput.value = ''
  linkInput.value = ''
  handleCardFormSubmit()
}

function handleCardFormSubmit(){
  popupCardForm.querySelector('.popup__button_type_close').addEventListener('click', () =>{
    popupCardForm.classList.remove('popup_open')})
  popupCardForm.querySelector('.popup__button_type_save').addEventListener('click', (evt) => {
    evt.preventDefault();
    popupCardForm.classList.remove('popup_open');
    const title = titleInput.value
    const link = linkInput.value
    const newCard = renderNewElement(title, link)
      elementsCard.prepend(newCard)
      closePopup()
})}



popupOpenButtonCardsForm.addEventListener('click', openPopupCards);
popupOpenButtonProfileForm.addEventListener('click', openPopupProfile);
popupCloseButtonFormProfile.addEventListener('click', closePopup);
popupCloseButtonFormCard.addEventListener('click', closePopup);
popupCloseButtonPhoto.addEventListener('click', closePopup)

popupForm.addEventListener('submit', handleProfileFormSubmit);
popupForm.addEventListener('submit', handleCardFormSubmit);

