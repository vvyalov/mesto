const container = document.querySelector('.page')
const popupOpenButtonForm = document.querySelector('.profile__edit-button')
const popupForm = document.querySelector('.popup')
const popupCloseButtonForm = popupForm.querySelector('.popup__button_type_close')
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle =  document.querySelector('.profile__subtitle')
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_job')


const openPopup = function() {
  popupForm.classList.add('popup_open')
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

const closePopup = function() {
    popupForm.classList.remove('popup_open')
}

popupOpenButtonForm.addEventListener('click', openPopup)
popupCloseButtonForm.addEventListener('click', closePopup)

function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup()
}

popupForm.addEventListener('submit', handleProfileFormSubmit);