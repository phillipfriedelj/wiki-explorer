"use client";

import { useState } from "react";
import LetterButtons from "./letter_buttons";
import PageLayout from "@/layout/page_layout";
import ResultsContainer from "./results_container";

import SearchBar from "./search_bar";
import { Group } from "@mantine/core";

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
    <PageLayout subtitle={"Explore Wikipedia's categories"}>
      <Group justify="space-between" gap="md" wrap="nowrap" px={"8px"}>
        <SearchBar onSearch={handleSearch} />
        <LetterButtons handleClick={setSelectedLetter} />
      </Group>
      <ResultsContainer
        selectedLetter={selectedLetter}
        setLoading={setLoading}
        loading={loading}
      />
    </PageLayout>
  );
}
