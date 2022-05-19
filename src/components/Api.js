export class Api {
  constructor (options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }


  _statusServer(res) {
      if (res.ok) {
        return res.json();
      }
      else {return Promise.reject(`Ошибка: ${res.status}`);
  }};
  
  getInitialCards() { 
    return fetch(`${this._baseUrl}/cards`,  {
      method: 'GET',
      headers: this._headers
    }) 
    .then(this._statusServer)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._statusServer)
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job
      })
    }).then(this._statusServer)
  }

  newAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link
      })
    }).then(this._statusServer)
  }

  getInitialNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._statusServer)
  }
  

  deleteCard(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}`, {
      method: "DELETE",
      headers: this._headers
    }).then(this._statusServer)
  }

  
  addLike(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
      method: "PUT",
      headers: this._headers
    }).then(this._statusServer)
  }
  
  removeLike(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
      method: "DELETE",
      headers: this._headers
    }).then(this._statusServer)
  }
}
