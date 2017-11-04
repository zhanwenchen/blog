/**
 * @file expose a class that provides methods for authentication
 */
export default class Auth {
  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static setToken(token) {
    localStorage.setItem('token', token);
  }

  static isTokenExist() {
    return this.getToken() !== null;
  }

  static removeToken() {
    localStorage.removeItem('token');
  }

  static getToken() {
    return localStorage.getItem('token');
  }
}
