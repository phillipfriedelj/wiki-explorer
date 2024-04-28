async function getCategoriesByLetterAndPage(selectedLetter, page, amount) {
  const response = await fetch(
    `/api/categories?letter=${selectedLetter}&page=${page}&amount=${amount}`
  );

  if (response.status === 500) {
    throw new Error("500 STATUS ", response.status);
  }
  const newPages = await response.json();
  return newPages;
}

async function getCategoryCount(selectedLetter) {
  const response = await fetch(`/api/categories?letter=${selectedLetter}`);

  if (response.status === 500) {
    throw new Error("500 STATUS ", response.status);
  }
  const categoryCount = await response.json();
  return categoryCount;
}

export { getCategoriesByLetterAndPage, getCategoryCount };
