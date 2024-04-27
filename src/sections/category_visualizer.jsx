"use client";

import { useState } from "react";
import LetterButtons from "../components/letter_buttons";
import ResultsContainer from "../components/results_container";
import SearchBar from "../components/search_barj";

export default function CategoryVisualizer() {
  const [loading, setLoading] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState("a");
  const [searchResults, setSearchResults] = useState([]);

  async function handleSearch(searchValue) {
    // const results = await fetch(`/api/search/${searchValue.replace(" ", "|")}`);
    const response = await fetch(`/api/search/${searchValue}`);
    if (response.status === 200) {
      const data = await response.json();
      console.log("SEARCH FOR ", data);
    } else {
      console.log("500 STATUS ", response.status);
    }
  }

  return (
    <>
      <div className="flex items-center space-x-4 w-full">
        <SearchBar onSearch={handleSearch} />
        <LetterButtons handleClick={setSelectedLetter} />
      </div>
      <ResultsContainer
        selectedLetter={selectedLetter}
        setLoading={setLoading}
        loading={loading}
      />
    </>
  );
}
