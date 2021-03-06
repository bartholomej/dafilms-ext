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
    if (url[2].includes('dafilms.cz') && url[3] === 'film') {
      // const movie: string = document.querySelector('.main-container h1.title').textContent;
      const movie = this.getValue('Originální název');
      const year = this.getValue('Rok');
      this.getItems(movie, year);
    }
  }

  private getValue(name: string): string {
    const labels: HTMLDivElement[] = Array.from(document.querySelectorAll('.list-details .label'));
    const label = labels.find((x) => x.textContent === name);
    return label.parentNode.querySelector('.value').textContent;
  }

  private getItems(movieName: string, year: string): void {
    const searchQuery = `${movieName} ${year}`;
    chrome.runtime.sendMessage(
      {
        contentScriptQuery: 'fetchData',
        searchQuery
      },
      (response: CSFDSearch) => {
        if (response) {
          this.renderer.renderBox(response.movies[0], movieName, year);
        } else {
          throw new Error("Can't connect to movie provider :(");
        }
      }
    );
  }
}

export default new DafilmsExt(new Renderer());
