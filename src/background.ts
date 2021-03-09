// import { piratebay } from 'piratebay-scraper';

import { csfd } from 'node-csfd-api';
import { CSFDMovie } from 'node-csfd-api/interfaces/movie.interface';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.contentScriptQuery) {
    case 'fetchData':
      csfd
        .search(request.searchQuery)
        .then((response) => {
          const movie = response.movies[0];

          if (movie) {
            fetchMovie(movie.id, sendResponse);
          } else {
            sendResponse(null);
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
      return true;
    case 'getMovie':
      fetchMovie(request.csfdId, sendResponse);
      return true;
    default:
      return false;
  }
});

const fetchMovie = async (id: number, sendResponse: any): Promise<CSFDMovie> => {
  try {
    const res = await csfd.movie(id);
    return sendResponse(res);
  } catch (error) {
    throw new Error(error);
  }
};
