// import { piratebay } from 'piratebay-scraper';

import { csfd } from 'node-csfd-api';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.contentScriptQuery) {
    case 'fetchData':
      csfd
        .search(request.searchQuery)
        .then((response) => {
          const movie = response.movies[0];

          if (movie) {
            csfd.movie(movie.id).then((res) => sendResponse(res));
          } else {
            sendResponse(null);
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
      return true;
    case 'fetchMovie':
      csfd.movie(request.csfdId).then((res) => sendResponse(res));
    default:
      return false;
  }
});
