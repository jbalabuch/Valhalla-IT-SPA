import $ from "jquery";

import itSpaCart from "../cart/it-spa-cart";
import cart from "../cart/it-spa-cart";
import binIcon from "../assets/icons/bin_icon.png";
import Auth from "../auth/auth";

export const booking = () => {
  const auth = new Auth();

  const fragment = $(new DocumentFragment());
  let container = $(`<div class="booking">`);

  const createTable = () => {
    let div = $(`<div class="w-100 mt-5">`);

    const bookings = cart.get();

    if (cart.get().length == 0) {
      const alert = $(
        `<div class="alert alert-info text-center p-5">Nie wybrano żadnych usług!</div>`
      );
      div.append(alert);
    } else {
      let table = $(`<table class="table text-dark">`);
      div.append(table);

      const thead = $(`
      <thead>
        <tr>
          <th>Nazwa</th>
          <th>Data przyjazdu</th>
          <th>Data wyjazdu</th>
          <th>Typ usługi</th>
          <th>Cena za noc</th>
          <th>Cena całkowita</th>
          <th></th>
        </tr>
      </thead>
      `);
      table.append(thead);

      const tbody = $(`<tbody>`);
      table.append(tbody);

      let sumPrice = 0;

      bookings.forEach((booking) => {
        sumPrice += booking.sumPrice;

        let tr;
        if (booking.type == "room") {
          tr = $(`
        <tr>
          <td>${booking.name}</td>
          <td>${new Date(booking.startDate).toLocaleDateString()}</td>
          <td>${new Date(booking.endDate).toLocaleDateString()}</td>
          <td>Pokój</td>
          <td>${booking.price} zł</td>
          <td>${booking.sumPrice} zł</td>
        </tr>
      `);
        } else {
          tr = $(`
        <tr>
          <td>${booking.name}</td>
          <td> - </td>
          <td> - </td>
          <td>Zabieg</td>
          <td> - </td>
          <td>${booking.sumPrice} zł</td>
        </tr>
      `);
        }

        const td = $("<td>");

        const button = $(
          `<input class="delete__button" type="image" src="${binIcon}">`
        );
        td.append(button);

        button.on("click", () => {
          cart.removeItem(booking.id);

          div.remove();
          div = createTable();
          container.append(div);
        });

        tr.append(td);
        tbody.append(tr);
      });

      const trSum = $(`
      <tr>
        <td colspan="5"><strong>SUMA</strong></td>
        <td>${sumPrice} zł</td>
        <td></td>
      </tr>
    `);

      tbody.append(trSum);

      const buttonOrder = $(`<button class="order__button">Zamów</button>`);
      buttonOrder.on("click", () => {
        if (!auth.isLogged()) {
          alert("Zaloguj się!");
          return;
        }

        alert("Potwierdzono rezerwację!");
        cart.empty();

        div.remove();
        div = createTable();
        container.append(div);
      });

      div.append(table);
      div.append(buttonOrder);
    }
    return div;
  };

  container.append(createTable());

  fragment.append(container);

  return Promise.resolve(fragment);
};
