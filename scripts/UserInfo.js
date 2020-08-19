export default class UserInfo {
  constructor({name, job}) {
    this.name = name;
    this.job = job;
  }

  //метод getUserInfo, который возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    }
  }

  //метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(nameValue, jobValue) {
    this._name.textContent = nameValue.value;
    this._job.textContent = jobValue.value;
  }
}