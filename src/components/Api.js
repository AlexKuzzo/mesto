export default class Api {
    constructor({ baseUrl, headers }) {
      this.url = baseUrl;
      this.headers = headers;
    }
}