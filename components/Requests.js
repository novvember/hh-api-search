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

    try {
      localStorage.setItem(this._key, JSON.stringify(newRequests));
    } catch (err) {
      if (err === QUOTA_EXCEEDED_ERR) {
        console.warn('Storage quota exceeded!');
      } else {
        console.warn('Something went wrong while saving requests!');
      }
    }
  }
}
