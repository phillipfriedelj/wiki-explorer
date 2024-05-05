"use client";

import LetterButtons from "./letter_buttons";
import PageLayout from "@/layout/page_layout";
import ResultsContainer from "./results_container";

import SearchBar from "./search_bar";
import { Group, Stack } from "@mantine/core";
import { useState } from "react";

import { CategoryList } from "./category_list";

export default function CategoryVisualizer() {
  const [selectedLetter, setSelectedLetter] = useState("a");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLink, setSelectedLink] = useState("");

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

  //CATEGORY FETCHING AND DISPLAY

  return (
    <PageLayout
      subtitle={"Explore Wikipedia's categories"}
      lateralContent={
        <CategoryList
          selectedLetter={selectedLetter}
          setSelectedLink={setSelectedLink}
        />
      }
    >
      <Stack h={"100%"}>
        <Group
          justify="space-between"
          gap="md"
          wrap="nowrap"
          px={"8px"}
          h={"100%"}
          mah={"100vh"}
        >
          <SearchBar onSearch={handleSearch} />
          <LetterButtons handleClick={setSelectedLetter} />
        </Group>
        <ResultsContainer selectedLink={selectedLink} />
      </Stack>
    </PageLayout>
  );
}
