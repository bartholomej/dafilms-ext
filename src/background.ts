// import { piratebay } from 'piratebay-scraper';

import { csfd } from 'node-csfd-api';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.contentScriptQuery === 'fetchData') {
    console.log('back');
    csfd
      .search(request.movieName)
      .then((response) => {
        if (response) {
          return response;
        }
        throw new Error("Can't connect to movie provider :(");
      })
      .then((response) => {
        sendResponse(response);
      })
      .catch((error) => {
        throw new Error(error);
      });
    return true;
  } else {
    return false;
  }
});
