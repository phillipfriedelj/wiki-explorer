"use client";

import { useState, useEffect } from "react";
import LetterButtons from "./letter_buttons";
import PageLayout from "@/layout/page_layout";
import ResultsContainer from "./results_container";
import CategoryCard from "./category_card";
import { Loader } from "@mantine/core";

export default function CategoryVisualizer() {
  const [selectedLetter, setSelectedLetter] = useState("a");
  const [selectedLink, setSelectedLink] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <PageLayout subtitle={"Explore Wikipedia's categories"}>
      <div className="flex items-center space-x-4 w-full">
        <LetterButtons handleClick={fetchCategoriesAndArticles} />
        {loading && <Loader color="blue" size={22} />}
      </div>
      <ResultsContainer
        results={results}
        selectedLink={selectedLink}
        selectedLetter={selectedLetter}
      />
    </PageLayout>
  );
}
