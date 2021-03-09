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
import { getCsfdId, isCzech } from './services/utils';

class DafilmsExt {
  constructor(private renderer: Renderer) {
    const url = window.location.href.split('/');
    const domain = url[2];
    const page = url[3];
    if (domain.includes('dafilms.') && page === 'film') {
      const csfdLink: string = (document.querySelector(
        'a[href*="https://www.csfd.cz/film/"]'
      ) as HTMLAnchorElement)?.href;

      const isCZ = isCzech(domain);

      const { movie, year } = this.getMovieAndYear(isCZ);

      if (csfdLink) {
        const csfdId = getCsfdId(csfdLink);
        this.getMovie(csfdId, movie, year);
      } else {
        this.getItems(movie, year);
      }
    }
  }

  private getMovieAndYear(isCzech: boolean): { movie: string; year: string } {
    if (isCzech) {
      const movie = this.getValue('Originální název')?.split('/')[0];
      const year = this.getValue('Rok');
      return { movie, year };
    } else {
      const movie = this.getValue('Original title')?.split('/')[0];
      const year = this.getValue('Year');
      return { movie, year };
    }
  }

  private getValue(name: string): string {
    const labels: HTMLDivElement[] = Array.from(document.querySelectorAll('.list-details .label'));
    const label = labels.find((x) => x.textContent === name);
    return label?.parentNode.querySelector('.value').textContent;
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
        contentScriptQuery: 'getMovie',
        csfdId
      },
      (response: CSFDMovie) => {
        this.renderer.renderBox(response, movieName, year);
      }
    );
  }
}

export default new DafilmsExt(new Renderer());
