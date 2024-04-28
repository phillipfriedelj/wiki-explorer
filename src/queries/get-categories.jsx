async function getCategoriesByLetterAndPage(
  selectedLetter,
  fetchFrom,
  fetchTo
) {
  const response = await fetch(
    `/api/categories?letter=${selectedLetter}&pageFrom=${fetchFrom}&pageTo=${fetchTo}`
  );

  if (response.status === 500) {
    throw new Error("500 STATUS ", response.status);
  }
  const newPages = await response.json();
  return newPages;
}

async function getCategoryCount(selectedLetter) {
  console.log("CC SELECTED LETTER :: ", selectedLetter);
  const response = await fetch(`/api/categories?letter=${selectedLetter}`);

  if (response.status === 500) {
    console.log("CC ERROR :: ", response.statusText);
    throw new Error("500 STATUS ", response.status);
  }
  const categoryCount = await response.json();
  console.log("CC -- NP:", categoryCount);
  return categoryCount;
}

export { getCategoriesByLetterAndPage, getCategoryCount };
