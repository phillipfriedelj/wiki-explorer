"use client";

import { useState } from "react";
import LetterButtons from "./letter_buttons";

export default function CategoryVisualizer() {
  const [selectedLetter, setSelectedLetter] = useState("");
  const [selectedLink, setSelectedLink] = useState("");
  const [results, setResults] = useState([]);

  async function handleClick(clickedLetter) {
    setSelectedLetter(clickedLetter);

    const response = await fetch(`/api/categories/${clickedLetter}`);
    if (response.status === 200) {
      const data = await response.json();
      console.log("DATA -- ", data);
      const categories = data.map((entry) => {
        return (
          <div className="m-1 rounded-md p-2 bg-gray-400">
            <div className="flex space-x-1">
              <p className="text-sm font-bold">{entry.title}</p>
              <button
                onClick={() =>
                  setSelectedLink(
                    `https://en.wikipedia.org/wiki/${entry.title}`
                  )
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
    } else {
      console.log("500 STATUS ", response.status);
    }
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
    <div className=" flex flex-col flex-grow h-full">
      <div>
        <h1>Wiki Explorer</h1>
        <LetterButtons handleClick={handleClick} />
        <p>Selected letter: {selectedLetter}</p>
      </div>
      <p className="bg-gray-100">Results:</p>
      <div className="flex bg-gray-100 py-2 flex-1 overflow-y-auto w-full h-full">
        <div className="flex flex-grow">
          <div className="flex flex-col w-1/2 flex-1">
            <div className="flex-1 overflow-y-auto">{results}</div>
          </div>
          <div className="w-1/2 flex-1">
            <iframe
              src={selectedLink ? selectedLink : "https://en.wikipedia.org"}
              height={"100%"}
              width={"100%"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
