import { CSFDMovie } from 'node-csfd-api/types/interfaces/movie.interface';
import type { Component } from 'solid-js';
import './Button.scss';
const _ = chrome.i18n.getMessage;

const Button: Component<CSFDMovie> = (movie) => {
  const urlUnknown = `https://www.csfd.cz/?q=${movie.title} ${movie.year}`;
  return (
    <a
      href={movie.url ?? urlUnknown}
      target="_blank"
      title={movie.title}
      class={'btn btn-success rating rating-' + movie.colorRating}
    >
      {_('csfd')} {movie.rating ?? '?'} %
    </a>
  );
};

export default Button;
