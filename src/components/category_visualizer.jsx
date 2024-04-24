"use client";

import { useState } from "react";
import LetterButtons from "./letter_buttons";
import PageLayout from "@/layout/page_layout";
import ResultsContainer from "./results_container";
import CategoryCard from "./category_card";

export default function CategoryVisualizer() {
  const [selectedLink, setSelectedLink] = useState("");
  const [results, setResults] = useState([]);

  async function fetchCategoriesAndArticles(clickedLetter) {
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
        <CategoryCard category={entry} setSelectedLink={setSelectedLink} />
      );
    });

    setResults(categories);
  }

  return (
    <PageLayout subtitle={"Explore Wikipedia's categorys"}>
      <LetterButtons handleClick={fetchCategoriesAndArticles} />
      <ResultsContainer results={results} selectedLink={selectedLink} />
    </PageLayout>
  );
}
