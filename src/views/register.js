import $ from "jquery";
import room from "../assets/room.png";
import intervention from "../assets/intervention.png";
import confirm from "../assets/confirm.png";
import date from "../assets/date.png";
import { modal } from "../modal/modal";
import { routeChange } from "../router/route-change";

export const register = () => {
  const fragment = $(new DocumentFragment());

  // fragment.append(modal());
  const container = $(`<div class="register">`);

  const formAlert = $(`<div class="alert alert-danger mt-3 mb-3">`);
  formAlert.hide();

  const title = $(`<h1 class="site__title text-center">Rejestracja</h1></br>`);

  const form = $(`<form class="w-50 m-auto text-center">`);

  const inputLogin = $(
    `<input type="email" class="form-control mt-3" placeholder="Wprowadź adres email..."/>`
  );

  const inputPassword = $(
    `<input type="password" class="form-control mt-3" placeholder="Hasło"/>`
  );
  const inputReppassword = $(
    `<input type="password" class="form-control mt-3" placeholder="Powtórz hasło"/>`
  );

  const button = $(
    `<button type="submit" class="register__button">Zarejestruj</button>`
  );
  console.log(form);

  const redirect = (path) => {
    $(document.body).trigger(routeChange, { path: path });
  };

  form.on("submit", (e) => {
    e.preventDefault();

    const login = inputLogin.val().trim();
    const password = inputPassword.val().trim();
    const reppassword = inputReppassword.val().trim();

    if (login === "" || password === "" || reppassword === "") {
      formAlert.text("Wprowadź wszystkie dane!");
      formAlert.show();
      return;
    }

    if (password != reppassword) {
      formAlert.text("Hasła nie są zgodne!");
      formAlert.show();
      return;
    }

    // if (password.length < 8) {
    //   alert.text("Hasło musi mieć minimum 8 znaków!")
    //   alert.show()
    //   return
    // }

    fetch(`http://127.0.0.1:3000/users?id=${login}`, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          formAlert.text("Błąd serwera!");
          formAlert.show();
        } else {
          return res.json();
        }
      })
      .then((users) => {
        if (users.length > 0) {
          formAlert.text("Użytkownik już istnieje!");
          formAlert.show();
        } else {
          const user = {
            id: login,
            password: password,
          };

          return fetch("http://127.0.0.1:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          });
        }
      })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          formAlert.text("Błąd serwera!");
          formAlert.show();
          return;
        }
        redirect("/");
      });
  });

  form.append(inputLogin, inputPassword, inputReppassword, formAlert, button);

  container.append(title, form);

  fragment.append(container);

  return Promise.resolve(fragment);
};
