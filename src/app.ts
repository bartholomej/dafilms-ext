/**
 * @class DafilmsExt
 *
 * DAFILMS extension adds a small button within each
 * movie detail to show information about ČSFD rating...
 *
 * @namespace DafilmsExt
 * @author Bartholomej
 * @see https://github.com/bartholomej/dafilms-ext
 */

import { CSFDSearch } from 'node-csfd-api/interfaces/search.interface';
import Renderer from './services/renderer';

class DafilmsExt {
  constructor(private renderer: Renderer) {
    const url = window.location.href.split('/');
    console.log('start');
    if (url[2].includes('dafilms.cz') && url[3] === 'film') {
      const movie: string = document.querySelector('.main-container h1.title').textContent;
      this.getItems(movie);
    }
  }

  private getItems(movieName: string): void {
    chrome.runtime.sendMessage(
      {
        contentScriptQuery: 'fetchData',
        movieName
      },
      (response: CSFDSearch) => {
        if (response) {
          console.log('Movies', response);
          this.renderer.renderBox(response.movies[0], movieName);
        } else {
          throw new Error("Can't connect to movie provider :(");
        }
      }
    );
  }
}

export default new DafilmsExt(new Renderer());
