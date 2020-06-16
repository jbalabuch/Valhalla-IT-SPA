import $ from 'jquery';

export const oops = () => {

    const fragment = $(new DocumentFragment());

    fragment
        .append('<h2>OOPS! Coś poszło nie tak</h2>')
        .append('<p>Wróć do <a href="">strony głównej</a></p>');

    return fragment;

}