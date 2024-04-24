"use client";

import { useState } from "react";
import LetterButtons from "./letter_buttons";
import PageLayout from "@/layout/page_layout";
import ResultsContainer from "./results_container";

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
        <div className="m-1 rounded-md p-2 bg-gray-400">
          <div className="flex space-x-1">
            <p className="text-sm font-bold">{entry.title}</p>
            <button
              onClick={() =>
                setSelectedLink(`https://en.wikipedia.org/wiki/${entry.title}`)
              }
              className="text-xs text-[#646cff]"
            >
              {"Go ->"}
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            {parseArticles(entry.categories_articles)}
          </div>
        </div>
      );
    });

    setResults(categories);
  }

  function parseArticles(articles) {
    var sorted = articles?.sort((entry) => entry.articles.first_letter);
    return sorted.map((entry) => {
      return (
        <button className="text-xs bg-gray-100 rounded-md p-2 text-left hover:bg-gray-200">
          {entry.articles.title}
        </button>
      );
    });
  }

  return (
    <PageLayout subtitle={"Explore Wikipedia's categorys"}>
      <LetterButtons handleClick={fetchCategoriesAndArticles} />
      <ResultsContainer results={results} selectedLink={selectedLink} />
    </PageLayout>
  );
}
