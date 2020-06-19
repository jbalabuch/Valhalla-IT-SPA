import $ from "jquery";
import Auth from "../auth/auth";
import { userlogin } from "./userlogin";

export const loginForm = () => {
  const auth = new Auth();

  const form = $(`<form class="login-panel">`);

  const inputLogin = $(
    `<input type="text" class="login-panel__login" placeholder="Wpisz login">`
  );
  const inputPassword = $(
    ` <input type="password" class="login-panel__password" placeholder="Wpisz hasło">`
  );

  const button = $(`<button class="login-panel__button">Zaloguj</button>`);

  form.on("submit", (e) => {
    e.preventDefault();

    const login = inputLogin.val();
    const password = inputPassword.val();

    fetch(`http://127.0.0.1:3000/users?login=${login}&password=${password}`, {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (data.length == 0) {
          alert("Błędne dane logowania!");
          return;
        }

        auth.setLogged(data[0].id);
        $(document.body).trigger(userlogin);
      });
  });

  form.append(inputLogin, inputPassword, button);

  return form;
};
