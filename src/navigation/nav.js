import $ from "jquery";
import { navItem } from "./nav-item";
import { routeChange } from "../router/route-change";
import { routes } from "../router/routes";
import logoImg from "../assets/logo.png";
import { loginForm } from "../loginForm/loginForm";
import { userlogin } from "../loginForm/userlogin";
import Auth from "../auth/auth";
import { userlogout } from "../loginForm/userlogout";

export const nav = () => {
  // const navbar = $(`
  //   <nav class="navbar navbar-expand navbar-dark bg-dark">
  //     <span class="navbar-brand">IT SPA</span>
  //     <ul class="navbar-nav mr-auto"></ul>
  //   </nav>
  // `);
  const auth = new Auth();
  const fragment = $(new DocumentFragment());

  const header = $(`
    <header class="header">
      <input class="menu-btn" type="checkbox" id="menu-btn" /><p class="menu-title">MENU</p>
      <label class="menu-icon" for="menu-btn"
        ><span class="nav-icon"></span
      ></label>
      <ul class="menu">
  
      </ul>
    </header>`);

  const logo = $(` <div class="logo">
    <a href="index.html"></a><img class="logo__image" src="${logoImg}" alt=""></a>
  </div>`);

  const form = loginForm();

  const userInfo = $(`<div class="login-panel">`);
  const h2 = $(`<h2 class="logout__text">`);

  userInfo.append(h2);

  const button = $(`<button class="logout-panel__button">Wyloguj</button>`);
  button.on("click", () => {
    $(document.body).trigger(userlogout);
  });

  userInfo.append(button);

  if (auth.isLogged()) {
    form.hide();

    const userId = auth.getUserId();

    h2.text("Witaj użytkowniku " + userId);
    userInfo.show();
  } else {
    userInfo.hide();
    form.show();
  }

  $(document.body).on(userlogout, () => {
    userInfo.hide();

    auth.setUnLogged();

    form.show();
  });

  $(document.body).on(userlogin, () => {
    form.hide();
    const userId = auth.getUserId();

    h2.text("Witaj użytkowniku " + userId);

    userInfo.children("h2").text("Witaj użytkowniku " + userId);
    userInfo.show();
  });

  // chcemy zbudowac tablice elementow navItem z odpowiednimi nazwami i callbackami
  const navItems = routes.map((route) => {
    const { name, path } = route;
    return navItem(name, () => {
      $(document.body).trigger(routeChange, { path: path });
    });
  });

  header.find("ul").append(navItems);

  fragment.append(logo, form, userInfo, header);

  return fragment;
};
