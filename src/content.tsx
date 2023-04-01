import { render } from 'solid-js/web';
import { getCsfdId, getCsfdLink, getPageArtefacts, insertAfter, isCzech } from './utils';
import { CSFDMovie } from 'node-csfd-api/types/interfaces/movie.interface';
import Button from './Button';
import { CATALOG_URLS } from './vars';
import { getButtonRootElements, getMovieAndYear } from './dafilms/utils';

const renderButton = (movie: CSFDMovie): void => {
  const { root, placingNode } = getButtonRootElements();
  if (root && placingNode) {
    insertAfter(placingNode, root);
    render(() => <Button {...movie} />, root);
  }
};

const getMovieAndRender = (csfdId: string): void => {
  chrome.runtime.sendMessage({ contentScriptQuery: 'getMovie', csfdId }, (movie: CSFDMovie) =>
    renderButton(movie)
  );
};

const searchMovieAndRender = (movieName: string | null, year: string | null): void => {
  const searchQuery = `${movieName} ${year}`;
  console.log('CSFD search', searchQuery);
  chrome.runtime.sendMessage(
    { contentScriptQuery: 'getSearchMovie', searchQuery },
    (movie: CSFDMovie) => renderButton(movie)
  );
};

// Check if we are on the right page
const { domain, page } = getPageArtefacts();

if (domain.includes(CATALOG_URLS.dafilms.domain) && page === CATALOG_URLS.dafilms.page) {
  const csfdLink = getCsfdLink();

  if (csfdLink) {
    const csfdId = getCsfdId(csfdLink);
    getMovieAndRender(csfdId);
  } else {
    const isCz = isCzech(domain);
    const { movie, year } = getMovieAndYear(isCz);
    if (movie && year) {
      searchMovieAndRender(movie, year);
    }
  }
}
