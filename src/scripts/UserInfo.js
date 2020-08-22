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
  setUserInfo(nameProfile, jobProfile) {
    this._name.textContent = nameProfile.value;
    this._job.textContent = jobProfile.value;
  }
}