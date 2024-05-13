async function getSearchResults(searchValue, page, amount) {
  const response = await fetch(
    `/api/search?term=${searchValue}&page=${page}&amount=${amount}`
  );

  if (response.status === 500) {
    throw new Error("500 STATUS ", response.status);
  }
  const searchResults = await response.json();
  return searchResults;
}

async function getSearchResultsCount(searchValue) {
  const response = await fetch(`/api/search?term=${searchValue}`);

  if (response.status === 500) {
    throw new Error("500 STATUS ", response.status);
  }
  const searchResultsCount = await response.json();
  return searchResultsCount;
}

export { getSearchResults, getSearchResultsCount };
