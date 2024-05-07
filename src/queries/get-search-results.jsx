async function getSearchResults(searchValue) {
  const response = await fetch(`/api/search/${searchValue}`);

  if (response.status === 500) {
    throw new Error("500 STATUS ", response.status);
  }
  const searchResults = await response.json();
  return searchResults;
}

export { getSearchResults };
