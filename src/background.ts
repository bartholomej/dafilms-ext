// import { piratebay } from 'piratebay-scraper';

import { csfd } from 'node-csfd-api';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.contentScriptQuery === 'fetchData') {
    csfd
      .search(request.searchQuery)
      .then((response) => {
        const movie = response.movies[0];

        if (movie) {
          csfd
            .movie(movie.id)
            .then((mov) => mov)
            .then((res) => sendResponse(res));
        } else {
          sendResponse(null);
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
    return true;
  } else {
    return false;
  }
});
