import cart from "./it-spa-cart";

export class Cart {
  constructor() {
    this.key = "IT_SPA_CART";
    // console.log(browser)

    // cookieStore.addEventListener('change', (event) => console.log(event));
  }

  cookie() {
    // PRZED: 'key1=val1; key2=val2; . . .'
    const cookies = document.cookie.split(";");
    // PO: ]'ket1=val1, 'key2=val2, . . .]
    console.log(cookies);
    const itSpaCookie = cookies.find((cookie) =>
      cookie.trim().startsWith(this.key)
    );
    // PO" 'IT_SPA_CART=wartosc' LUB UNDEFINED
    return itSpaCookie;
  }

  exists() {
    return this.cookie() !== undefined;
  }

  get() {
    if (this.exists()) {
      // 'IT_SPA_CART=wartość'
      const itSpaCookie = this.cookie(); // 'IT_SPA_CART=[1,2,2]'
      const cookieValue = itSpaCookie.split("=")[1]; // ['IT_SPA_CART', '[1,2,2]']
      const parsedValue = JSON.parse(cookieValue); // wartość

      return parsedValue;
    } else {
      this.set([]);
      return [];
    }
  }

  set(value) {
    const stringifiedValue = JSON.stringify(value);
    document.cookie = `${this.key}=${stringifiedValue}`;
  }

  addRoom(name, startDate, endDate, price, sumPrice) {
    if (this.exists()) {
      // 'IT_SPA_CART=wartość'
      const itSpaCookie = this.cookie(); // 'IT_SPA_CART=[1,2,2]'
      const cookieValue = itSpaCookie.split("=")[1]; // ['IT_SPA_CART', '[1,2,2]']
      const parsedValue = JSON.parse(cookieValue); // wartość

      const id = parsedValue[parsedValue.length - 1].id + 1;

      const booking = {
        id,
        name,
        startDate,
        endDate,
        price,
        sumPrice,
        type: "room",
      };

      parsedValue.push(booking);

      this.set(parsedValue);

      return parsedValue;
    } else {
      const booking = {
        id: 1,
        name,
        startDate,
        endDate,
        price,
        sumPrice,
        type: "room",
      };

      this.set([booking]);
    }
  }

  addTreatment(name, sumPrice) {
    if (this.exists()) {
      // 'IT_SPA_CART=wartość'
      const itSpaCookie = this.cookie(); // 'IT_SPA_CART=[1,2,2]'
      const cookieValue = itSpaCookie.split("=")[1]; // ['IT_SPA_CART', '[1,2,2]']
      const parsedValue = JSON.parse(cookieValue); // wartość
      console.log(parsedValue);
      let id = 1;
      if (parsedValue.length > 0) {
        id = parsedValue[parsedValue.length - 1].id + 1;
      }

      const booking = {
        id,
        name,
        sumPrice,
        type: "treatment",
      };

      parsedValue.push(booking);

      this.set(parsedValue);

      return parsedValue;
    } else {
      const booking = {
        id: 1,
        name,
        sumPrice,
        type: "treatment",
      };

      this.set([booking]);
    }
  }

  removeItem(id) {
    if (this.exists()) {
      const itSpaCookie = this.cookie(); // 'IT_SPA_CART=[1,2,2]'
      const cookieValue = itSpaCookie.split("=")[1]; // ['IT_SPA_CART', '[1,2,2]']
      let cartItems = JSON.parse(cookieValue); // wartość

      cartItems = cartItems.filter((item) => item.id != id);

      cart.set(cartItems);
    }
  }

  empty() {
    this.set([]);
  }
}
