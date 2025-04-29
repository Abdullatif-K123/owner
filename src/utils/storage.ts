export const tokenChangedEvent = new Event("tokenChanged");
export const storage = {
  setToken(token: string) {
    localStorage.setItem("token", token);
    window.dispatchEvent(tokenChangedEvent);
  },
  clearToken() {
    localStorage.setItem("token", "");
    window.dispatchEvent(tokenChangedEvent);
  },
  getToken() {
    return localStorage.getItem("token");
  },
  setLanguage(language: string) {
    localStorage.setItem("lang", language);
  },
  getLanguage() {
    return localStorage.getItem("lang");
  },
};
