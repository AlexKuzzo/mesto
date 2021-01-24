export default class UserInfo {
  constructor({name, job, avatar}) {
    this._name = name;
    this._job = job;
    this._avatar = avatar;
    this._userAvatar = document.querySelector('.profile__avatar');
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

  //исправил ошибку по ревью
  setAvatar(avatar) {
    this._userAvatar.src = avatar;
  }
}