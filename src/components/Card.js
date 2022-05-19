export class Card {
  constructor({data, userId, handleCardClick, handleDeleteCard, handleLikeClick, removeLikeClick}, templateSelector) {
    this._cardTemplate = document.querySelector(templateSelector).content
    this.data = data
    this._name = data.name
    this._link = data.link
    this.handleCardClick = handleCardClick
    this._userId = userId
    this._handleDeleteCard = handleDeleteCard
    this._handleLikeClick = handleLikeClick
    this.removeLikeClick = removeLikeClick
  }

  deleteCard() {
    this._elementCard.remove();
    this._elementCard = null
  }

  _setEventListener() {
    this._elementLike.addEventListener('click', () => {
      if (this._elementLike.classList.contains('element__like_active')) {
        this.removeLikeClick();
      } else {
        this._handleLikeClick()
      }
    });
    this._elementDelete.addEventListener('click', this._handleDeleteCard);
    this._elementImage.addEventListener('click', () => { this.handleCardClick(); });
  }

  _checkOwner() {
    return (this.data.owner._id === this._userId)
  }

 
  addLike() {
    this._elementLike.classList.add('element__like_active')
  }

  removeLike() {
    this._elementLike.classList.remove('element__like_active')
  }

  setLikes(data) {
    this._elementLikeNumb.textContent = data.likes.length;
  }

  _checkOwnerLike() {
    this.data.likes.forEach((ownerLike) => {
      if (ownerLike._id === this._userId) {
        this.addLike();
      }
    })
  }

  _removeDeleteButton() {
    if (!this._checkOwner()) {
      this._elementDelete.classList.add('element__delete_none')
    }
  }

  getNewElement() {
    this._elementCard = this._cardTemplate.querySelector('.element').cloneNode(true)
    this._elementName = this._elementCard.querySelector('.element__text')
    this._elementImage = this._elementCard.querySelector('.element__image')
    this._elementDelete = this._elementCard.querySelector('.element__delete')
    this._elementLike = this._elementCard.querySelector('.element__like_button')
    this._elementLikeNumb = this._elementCard.querySelector('.element__like_number')
    this._elementName.textContent = this._name
    this._elementImage.src = this._link
    this._elementImage.alt = this._name
    this._setEventListener()
    this._checkOwnerLike()
    this.setLikes(this.data)
    this._removeDeleteButton()
    return this._elementCard
  }
}