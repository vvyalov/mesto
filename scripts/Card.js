import { openPopup, photoPopup } from './utils.js'

const imageCard = document.querySelector('.popup__image')
const textImage = document.querySelector('.popup__text')


export class Card {
  constructor(data, templateSelector) {
    this._cardTemplate = document.querySelector(templateSelector).content
    this._name = data.name
    this._link = data.link
  }

  _deleteElement() {
    this._elementCard.remove()
  }

  _setEventListener() {
    this._elementImage.addEventListener('click', () => {
      imageCard.src = this._link
      imageCard.alt = this._name
      textImage.textContent = this._name
      openPopup(photoPopup)
    })
    this._elementCard.querySelector('.element__delete').addEventListener('click', () => { this._deleteElement() })
    this._elementCard.querySelector('.element__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like_active')
    })
  }

  getNewElement() {
    this._elementCard = this._cardTemplate.querySelector('.element').cloneNode(true)
    this._elementName = this._elementCard.querySelector('.element__text')
    this._elementImage = this._elementCard.querySelector('.element__image')
    this._elementName.textContent = this._name
    this._elementImage.src = this._link
    this._elementImage.alt = this._name

    this._setEventListener()

    return this._elementCard
  }
}