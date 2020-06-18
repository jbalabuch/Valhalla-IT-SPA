import $ from "jquery";
import { navItem } from "./nav-item";
import { routeChange } from "../router/route-change";
import { routes } from "../router/routes";
import logo from "../assets/logo.png";

export const nav = () => {
  // const navbar = $(`
  //   <nav class="navbar navbar-expand navbar-dark bg-dark">
  //     <span class="navbar-brand">IT SPA</span>
  //     <ul class="navbar-nav mr-auto"></ul>
  //   </nav>
  // `);

  const navbar = $(`
      <div class="logo">
      <a href="index.html"></a><img class="logo__image" src="${logo}" alt=""></a>
    </div>
    <form action="/" class="login-panel">
    <input type="text" class="login-panel__login" placeholder="Wpisz login">
    <input type="password" class="login-panel__password" placeholder="Wpisz hasło">
    <button class="login-panel__button">Zaloguj</button>
    </form>
    <header class="header">
      <input class="menu-btn" type="checkbox" id="menu-btn" /><p class="menu-title">MENU</p>
      <label class="menu-icon" for="menu-btn"
        ><span class="nav-icon"></span
      ></label>
      <ul class="menu">
  
      </ul>
    </header>`);

  // chcemy zbudowac tablice elementow navItem z odpowiednimi nazwami i callbackami
  const navItems = routes.map((route) => {
    const { name, path } = route;
    return navItem(name, () => navbar.trigger(routeChange, { path: path }));
  });

  navbar.find("ul").append(navItems);

  return navbar;
};
