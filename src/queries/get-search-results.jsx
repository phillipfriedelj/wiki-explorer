async function getSearchResults(searchValue, page, amount) {
  if (!searchValue || searchValue.trim() === "") {
    return null;
  }
  const response = await fetch(
    `/api/search?term=${searchValue.trim()}&page=${page}&amount=${amount}`
  );

  if (response.status === 500) {
    throw new Error("500 STATUS ", response.status);
  }
  const searchResults = await response.json();
  return searchResults;
}

async function getSearchResultsCount(searchValue) {
  if (!searchValue || searchValue.trim() === "") {
    return null;
  }

  const response = await fetch(`/api/search?term=${searchValue.trim()}`);

  if (response.status === 500) {
    throw new Error("500 STATUS ", response.status);
  }
  const searchResultsCount = await response.json();
  return searchResultsCount;
}

export { getSearchResults, getSearchResultsCount };
