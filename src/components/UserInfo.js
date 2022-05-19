export class UserInfo {
  constructor ({nameSelector, jobSelector, avatarSelector}) {
    this._nameProfile = document.querySelector(nameSelector)
    this._jobProfile = document.querySelector(jobSelector)
    this._userAvatar = document.querySelector(avatarSelector)
  }

  getUserInfo(){
    const data = {
      nameProfile: this._nameProfile.textContent,
      jobProfile: this._jobProfile.textContent,
    }
    return data
  }
  

  setUserInfo(data){
    this._nameProfile.textContent = data.name;
    this._jobProfile.textContent = data.about;
  }

  getUserAvatar() {
    return this._userAvatar.src
  }

  setUserAvatar(data) {
    this._userAvatar.src = data.avatar
  }
}

