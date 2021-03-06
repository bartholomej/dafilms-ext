/**
 * @class Renderer
 *
 * Class for DOM rendering
 *
 * @namespace DafilmsExt
 * @author Bartholomej
 * @see https://github.com/bartholomej/dafilms-ext
 */

import { CSFDMovie } from 'node-csfd-api/interfaces/movie.interface';
import { Browser } from '../interfaces/interfaces';
import { isDev } from './utils';

declare let BROWSER: Browser;

export default class Renderer {
  /**
   * Assemble box, wrapper and put it on the right place
   */
  public renderBox(movie: CSFDMovie, movieName: string, year: string): HTMLLIElement {
    const placingNode = document.querySelector('.film-access ul li');
    const wrapper = document.createElement('li');
    wrapper.classList.add('dafilms-ext');
    const _ = chrome.i18n.getMessage;

    const devFlag = isDev ? '<sup>&beta;</sup>' : '';

    let box: string;

    if (movie) {
      box = `          
      <a href="${movie.url}" 
        target="_blank" 
        title="${movie.title}" 
        class="btn btn-success rating rating-${movie.colorRating}">
          ${devFlag} ${_('csfd')} ${movie.rating ? movie.rating : '?'} %
      </a>    
    `;
    } else {
      box = `
      <a href="//new.csfd.cz/hledat/?q=${movieName} ${year}" 
        target="_blank" 
        class="btn btn-success rating rating-unknown">
          ${devFlag} ${_('csfd')} ${_('search')}
      </a>
    `;
    }

    wrapper.innerHTML = box;
    this.insertAfter(placingNode, wrapper);
    return wrapper;
  }

  /**
   * Helper for inserting node after some element
   */
  private insertAfter(referenceNode: Element, newNode: HTMLLIElement): void {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }
}
