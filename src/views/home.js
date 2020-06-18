import $ from "jquery";
import room from "../assets/room.png";
import intervention from "../assets/intervention.png";
import confirm from "../assets/confirm.png";
import date from "../assets/date.png";
import { modal } from "../modal/modal";

export const home = () => {
  const fragment = $(new DocumentFragment());

  fragment.append(modal());

  const content = $(`
  <section class="home">
  <div class="home__text">Witamy na stronie internetowej hotelu VALHALLA IT SPA!</div>
</section>

<section class="article-list">
  <article class="article article-list__article">
      <h1 class="article__title">Krok 1</h1>
      <img src="${date}" alt="" class="article__image">
      <h1 class="article__subtitle">Zarezerwuj</br>termin</h1>
  </article>
  <article class="article article-list__article">
      <h1 class="article__title">Krok 2</h1>
      <img src="${room}" alt="" class="article__image">
      <h1 class="article__subtitle">Wybierz</br>pokój</h1>
  </article>
  <article class="article article-list__article">
      <h1 class="article__title">Krok 3</h1>
      <img src="${intervention}" alt="" class="article__image">
      <h1 class="article__subtitle">Dobierz</br>zabiegi</h1>
  </article>
  <article class="article article-list__article">
      <h1 class="article__title">Krok 4</h1>
      <img src="${confirm}" alt="" class="article__image">
      <h1 class="article__subtitle">Potwierdź</br>zamówienie</h1>
  </article></section>

  <section class="offer">
      <section class="offer-rooms">
      <div class="offer-rooms__text">Nocleg w luksusowym pokoju</br>już od 199 zł za osobę</div>
  </section>

  <section class="offer-intervention">
      <div class="offer-intervention__text">Relaksujące zabiegi dla mężczyzn</br>już od 59 zł za zabieg</div>
  </section></section>

</section>
  
  `);

  // fragment.append(content);

  return Promise.resolve(fragment);
};
