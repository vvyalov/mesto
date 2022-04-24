export class UserInfo {
  constructor ({nameSelector, jobSelector}) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
    this._nameProfile = document.querySelector(this._nameSelector)
    this._jobProfile = document.querySelector(this._jobSelector)

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
    console.log(name)
  }
}

