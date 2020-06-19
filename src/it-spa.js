import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/js/dist/modal"
import "./it-spa.css";
import $ from "jquery";
import { Router } from "./router/router";
import { nav } from "./navigation/nav";
import { footer } from "./footer/footer";

const main = $("main");

const router = new Router();

router.mount(main);

router.init();

main.before(nav());
main.after(footer());
