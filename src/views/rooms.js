import $ from "jquery";
import room1 from "../assets/rooms/1.jpg";
import room2 from "../assets/rooms/2.jpg";
import room3 from "../assets/rooms/3.jpg";
import room4 from "../assets/rooms/4.jpg";
import room5 from "../assets/rooms/5.jpg";
import { modal } from "../modal/modal";
import itSpaCart from "../cart/it-spa-cart";

const roomsImg = [room1, room2, room3, room4, room5];

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
        let selectedRoom = {};
        const getSelectedRoom = () => {
          return selectedRoom;
        };

        fragment.append(modal(getSelectedRoom));

        data.forEach((obj, i) => {
          const roomsOptions = $(`<div class="rooms__options">`);

          const roomList1 = $(`
          <div class="rooms__list">
            <img src="${roomsImg[i]}" alt="" class="rooms__image">
          </div>
          `);

          const roomList2 = $(`
          <div class="rooms__list">
          <h1 class="rooms__name">${obj.name}</h1>
            <p class="rooms__description">${obj.description}</p></br>
            <p class="rooms__description"><strong>Cena za noc: </strong>
              ${obj.price} zł za pokój</p>
          </div>
          `);

          const button = $(`<button class="rooms__button">ZAREZERWUJ</button>`);
          roomList2.append(button);

          button.on("click", () => {
            selectedRoom = obj;

            console.log(selectedRoom);

            $("#reservation").modal();
          });

          roomsOptions.append(roomList1, roomList2);

          rooms.append(roomsOptions);
        });

        fragment.append(rooms);

        resolve(fragment);
      });
  });
