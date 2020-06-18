import $ from "jquery";
import { Cart } from "../cart/cart";

export const modal = () => {
  const cart = new Cart();

  const modal = $(`
    <div class="mod">
  `);

  const title = $(`<h2>Wybierz okres pobytu</h2>`);

  const button = $(`<button>Zatwierdź</button>`);

  const startDateInput = $(`<input type="date" id="start-date" />`);
  const endDateInput = $(`<input type="date" id="end-date" />`);

  button.on("click", () => {
    const actualDate = new Date();
    const startDate = new Date(startDateInput.val());
    const endDate = new Date(endDateInput.val());

    console.log(cart.get());

    console.log(startDate);
    if (startDate.getTime() < actualDate.getTime()) {
      alert("Wprowadź poprawną datę!");
      return;
    }
  });

  modal.append(title);
  modal.append(startDateInput);
  modal.append(endDateInput);
  modal.append(button);

  return modal;
};
