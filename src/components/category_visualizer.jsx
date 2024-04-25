"use client";

import { useState, useEffect } from "react";
import LetterButtons from "./letter_buttons";
import PageLayout from "@/layout/page_layout";
import ResultsContainer from "./results_container";
import CategoryCard from "./category_card";
import { Loader } from "@mantine/core";
import SearchBar from "./search_barj";

export default function CategoryVisualizer() {
  const [selectedLetter, setSelectedLetter] = useState("a");
  const [selectedLink, setSelectedLink] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchCategoriesAndArticles("a");
  }, []);

  async function fetchCategoriesAndArticles(clickedLetter) {
    setSelectedLetter(clickedLetter);

    setLoading(true);
    const response = await fetch(`/api/categories/${clickedLetter}`);
    if (response.status === 200) {
      const data = await response.json();
      parseResults(data);
    } else {
      console.log("500 STATUS ", response.status);
    }
  }

  function parseResults(data) {
    const categories = data.map((entry) => {
      return (
        <CategoryCard
          key={entry.title}
          category={entry}
          setSelectedLink={setSelectedLink}
        />
      );
    });

    setResults(categories);
    setLoading(false);
  }

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
    <PageLayout subtitle={"Explore Wikipedia's categories"}>
      <div className="flex items-center space-x-4 w-full">
        <SearchBar onSearch={handleSearch} />
        <LetterButtons handleClick={fetchCategoriesAndArticles} />
      </div>
      <ResultsContainer
        results={results}
        selectedLink={selectedLink}
        selectedLetter={selectedLetter}
        loading={loading}
      />
    </PageLayout>
  );
}
