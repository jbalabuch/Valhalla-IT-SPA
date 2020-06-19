import { home, rooms, treatments, booking, register } from "../views";

export const routes = [
  { name: "Strona główna", path: "/", data: {}, component: home },
  { name: "Pokoje", path: "/rooms", data: {}, component: rooms },
  { name: "Zabiegi", path: "/treatments", data: {}, component: treatments },
  { name: "Rezerwacja", path: "/booking", data: {}, component: booking },
  { name: "Rejestracja", path: "/register", data: {}, component: register },
];
