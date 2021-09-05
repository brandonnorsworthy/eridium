import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }
  
  getUsername() {
    return decode(this.getToken()).data.username;
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.replace('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.replace('/login');
  }
}

export default new AuthService();