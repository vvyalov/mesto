export class Card {
  constructor({data, handleCardClick}, templateSelector) {
    this._cardTemplate = document.querySelector(templateSelector).content
    this._name = data.name
    this._link = data.link
    this._handleCardClick = handleCardClick
  }

  _deleteElement() {
    this._elementCard.remove();
    this._element = null;
  }

  _setEventListener() {
    this._elementCard.querySelector('.element__delete').addEventListener('click', () => { this._deleteElement() })
    this._elementCard.querySelector('.element__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like_active')
    })
    this._elementImage.addEventListener('click', () => { this._handleCardClick() } )
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