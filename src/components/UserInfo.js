export class UserInfo {
  constructor ({nameSelector, jobSelector}) {
    this._nameProfile = document.querySelector(nameSelector)
    this._jobProfile = document.querySelector(jobSelector)

  }

  getUserInfo(){
    const data = {
      nameProfile: this._nameProfile.textContent,
      jobProfile: this._jobProfile.textContent,
    }
    return data
  }
  

  setUserInfo({name, job}){
    this._nameProfile.textContent = name;
    this._jobProfile.textContent = job;
  }
}

