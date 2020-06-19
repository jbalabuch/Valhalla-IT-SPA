class Auth {
  constructor() {
    this.key = "IT_SPA_AUTH";
    // console.log(browser)

    // cookieStore.addEventListener('change', (event) => console.log(event));
  }

  cookie() {
    // PRZED: 'key1=val1; key2=val2; . . .'
    const cookies = document.cookie.split(";");
    // PO: ]'ket1=val1, 'key2=val2, . . .]
    const itSpaCookie = cookies.find((cookie) =>
      cookie.trim().startsWith(this.key)
    );
    // PO" 'IT_SPA_CART=wartosc' LUB UNDEFINED
    return itSpaCookie;
  }

  getUserId() {
    if (!this.isLogged()) return;

    const itSpaCookie = this.cookie();
    const userId = itSpaCookie.split("=")[1].trim();
    return userId;
  }

  isLogged() {
    return this.cookie() !== undefined;
  }

  setLogged(userId) {
    document.cookie = `${this.key}=${userId}`;
  }

  setUnLogged() {
    const userId = this.getUserId();
    document.cookie = `${this.key}=${userId};expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  }
}

export default Auth;
