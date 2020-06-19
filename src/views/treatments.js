import $ from "jquery";
import treatment1 from "../assets/treatments/1.jpg";
import treatment2 from "../assets/treatments/2.jpg";
import treatment3 from "../assets/treatments/3.jpg";
import cart from "../cart/it-spa-cart";

const treatmentsImg = [treatment1, treatment2, treatment3];

export const treatments = () =>
  new Promise((resolve, reject) => {
    const fragment = $(new DocumentFragment());

    const treatments = $(`<section class="treatments">`);

    const title = $(`<h1 class="site__title">Dostępne zabiegi:</h1></br>`);

    treatments.append(title);

    fetch("http://localhost:3000/treatments ", {
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
        data.forEach((obj, i) => {
          const treatmentsOptions = $(`<div class="treatments__options">`);

          const treatmentsList1 = $(`
          <div class="treatments__list">
            <img src="${treatmentsImg[i]}" alt="" class="treatments__image">
          </div>
          `);

          const treatmentsList2 = $(`
          <div class="treatments__list">
          <h1 class="treatments__name">${obj.name}</h1>
            <p class="treatments__description">${obj.description}</p></br>
            <p class="treatments__description"><strong>Cena: </strong>
              ${obj.price} zł za zabieg</p>
          </div>
          `);

          const button = $(
            `<button class="treatments__button">ZAREZERWUJ</button>`
          );
          treatmentsList2.append(button);

          button.on("click", () => {
            // console.log(obj)
            const { name, price } = obj;
            cart.addTreatment(name, price);
            alert("dodano zabieg do koszyka!");
          });

          treatmentsOptions.append(treatmentsList1, treatmentsList2);

          treatments.append(treatmentsOptions);
        });

        fragment.append(treatments);

        resolve(fragment);
      });
  });
