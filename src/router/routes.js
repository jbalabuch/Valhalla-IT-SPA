import { home, rooms, treatments, booking } from '../views';

export const routes = [
  { name: 'Strona główna', path: '/', data: {}, component: home },
  { name: 'Pokoje', path: '/rooms', data: {}, component: rooms },
  { name: 'Zabiegi', path: '/treatments', data: {}, component: treatments },
  { name: 'Rezerwacja', path: '/booking', data: {}, component: booking }
];
