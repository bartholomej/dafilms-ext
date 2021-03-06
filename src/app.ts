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

import { CSFDMovie } from 'node-csfd-api/interfaces/movie.interface';
import Renderer from './services/renderer';

class DafilmsExt {
  constructor(private renderer: Renderer) {
    const url = window.location.href.split('/');
    if (url[2].includes('dafilms.cz') && url[3] === 'film') {
      const csfdLink: string = (document.querySelector(
        'a[href*="https://www.csfd.cz/film/"]'
      ) as HTMLAnchorElement)?.href;

      const movie = this.getValue('Originální název').split('/')[0];
      const year = this.getValue('Rok');

      if (csfdLink) {
        const csfdParts = csfdLink.split('/');
        const csfdId = csfdParts[csfdParts.length - 1];
        this.getMovie(csfdId, movie, year);
      } else {
        this.getItems(movie, year);
      }
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
      (response: CSFDMovie) => {
        this.renderer.renderBox(response, movieName, year);
      }
    );
  }

  private getMovie(csfdId: string, movieName: string, year: string): void {
    chrome.runtime.sendMessage(
      {
        contentScriptQuery: 'fetchMovie',
        csfdId
      },
      (response: CSFDMovie) => {
        this.renderer.renderBox(response, movieName, year);
      }
    );
  }
}

export default new DafilmsExt(new Renderer());
