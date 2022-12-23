export default class Requests {
  constructor(key) {
    this._key = key;
  }

  get() {
    let requests = [];

    try {
      requests = JSON.parse(localStorage.getItem(this._key)) ?? [];
    } catch {
      console.warn("Can't read local storage");
    }

    return requests;
  }

  add(text) {
    const prevRequests = this.get();
    const newRequests = [...new Set([text, ...prevRequests])];
    localStorage.setItem(this._key, JSON.stringify(newRequests));
  }
}
