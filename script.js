let container = document.querySelector('.page')
let popupOpenButtonForm = document.querySelector('.profile__edit-button')
let popupForm = document.querySelector('.popup')
let popupCloseButtonForm = popupForm.querySelector('.popup__button_close')
let profileTitle = document.querySelector('.profile__title')
let profileSubtitle =  document.querySelector('.profile__subtitle')
let nameInput = document.querySelector('.popup__profile_name')
let jobInput = document.querySelector('.popup__profile_job')


let openPopup = function() {
  popupForm.classList.add('popup_open')
  if (popupForm.classList.contains('popup_open')) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
  }
}

let closePopup = function() {
    popupForm.classList.remove('popup_open')
}

popupOpenButtonForm.addEventListener('click', openPopup)
popupCloseButtonForm.addEventListener('click', closePopup)

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
}

popupForm.addEventListener('submit', formSubmitHandler);