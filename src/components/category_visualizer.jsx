"use client";

import { useState, useEffect } from "react";
import LetterButtons from "./letter_buttons";
import PageLayout from "@/layout/page_layout";
import ResultsContainer from "./results_container";
import CategoryCard from "./category_card";

export default function CategoryVisualizer() {
  const [selectedLetter, setSelectedLetter] = useState("a");
  const [selectedLink, setSelectedLink] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchCategoriesAndArticles("a");
  }, []);

  async function fetchCategoriesAndArticles(clickedLetter) {
    setSelectedLetter(selectedLetter);

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
  }

  return (
    <PageLayout subtitle={"Explore Wikipedia's categorys"}>
      <LetterButtons handleClick={fetchCategoriesAndArticles} />
      <ResultsContainer
        results={results}
        selectedLink={selectedLink}
        selectedLetter={selectedLetter}
      />
    </PageLayout>
  );
}
