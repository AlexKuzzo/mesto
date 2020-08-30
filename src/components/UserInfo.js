export default class UserInfo {
  constructor({name, job}) {
    this._name = name;
    this._job = job;
  }

  //метод getUserInfo, который возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    }
  }

  //метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({name, about}) {
    this._name.textContent = name;
    this._job.textContent = about;
  }

  setAvatar(avatar) {
    // document.querySelector('.profile__avatar').style.backgroundImage = 'url('+avatar+')';
    if (avatar) {
      document.querySelector('.profile__avatar').src = avatar
    }
  }
}