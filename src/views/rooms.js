import $ from 'jquery';
import db from '../../../it-spa/database.json';

export const rooms = () => {
  const fragment = $(new DocumentFragment());

  fragment
    .append('<h2>Rooms</h2>')
    .append('<p>Lorem ipsum dolor sit amet...</p>');


    // const roomItems = rooms.map(rooms => {
    //   const { name, beds } = rooms;
    //   return roomItems(name, () => navbar.trigger(routeChange, { path: path }));
    // });

  return fragment;
};
