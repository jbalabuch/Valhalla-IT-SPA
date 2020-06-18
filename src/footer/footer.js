import $ from "jquery";

export const footer = () => {
  const footer = $(`
  <footer class="footer">
  <div class="sm-links">
      <h1 class="sm-links__title">
          Wszelkie prawa zastrzeżone dla Valhalla IT SPA</div>
  </footer>
`);

  return footer;
};
