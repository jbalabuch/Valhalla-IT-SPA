import $ from "jquery";
import db from "../../../it-spa/database.json";

export const rooms = () =>
  new Promise((resolve, reject) => {
    const fragment = $(new DocumentFragment());

    const rooms = $(`<section class="rooms">`);

    const title = $(`<h1 class="site__title">Dostępne pokoje:</h1></br>`);

    rooms.append(title);

    fetch("http://localhost:3000/rooms ", {
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
        } else {
          return res.json();
        }
      })
      .then((data) => {
        data.forEach((obj) => {
          const room = $(`
          <div class="rooms__options">
            <div class="rooms__list">
            <img src="${obj.img}" alt="" class="rooms__image"></div>
            <div class="rooms__list">
              <h1 class="rooms__name">${obj.name}</h1>
            <p class="rooms__description">${obj.description}</p></br>
            <p class="rooms__description"><strong>Wyposażenie pokoju: </strong>
              łazienka wyposażona w kabinę prysznicową; ręczniki; łóżko 140 cm; telefon; dostęp do bezprzewodowego internetu; TV satelitarna; suszarka do włosów</p>
            </br>
            <p class="rooms__description"><strong>Cena za noc: </strong>
              ${obj.price} zł za pokój</p><button type="submit" class="rooms__button">ZAREZERWUJ</button>
          </div>
        </div>
          `);

          rooms.append(room);
        });

        fragment.append(rooms);

        resolve(fragment);
      });
  });
