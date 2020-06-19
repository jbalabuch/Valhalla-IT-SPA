import { Cart } from "./cart";

// export const itSpaCart = () => {


//   // cookieStore.addEventListener("change", (event) => {
//   //   // jeśli zaistniała zmiana w cookies,
//   //   // ponownie pobieram zawartość kosza
//   //   const NowaZawartosc = cart.get();

//   //   // ...i poprawiam wyświetlane przez kosz informacje
//   //   // TODO
//   // });
// };
const cart = new Cart();

export default cart