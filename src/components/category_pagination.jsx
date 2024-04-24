"use client";

import { Pagination, Group } from "@mantine/core";
import { useState, useEffect, useCallback } from "react";

export default function CategoryPagination({ results, letter }) {
  const [activePage, setActivePage] = useState(1);
  const [pageTotal, setPageTotal] = useState(0);
  const entriesPerPage = 100;

  useEffect(() => {
    console.log("LETTER CHANGED -- ", letter);
  }, [letter]);

  const getCategoryCount = useCallback(async () => {
    console.log("FETCHING -- ");
    const response = await fetch(`/api/categories/count/${letter}`);
    if (response.status === 200) {
      const categoryCount = await response.json();
      setPageTotal(categoryCount / entriesPerPage);
      console.log(
        "COUNT -- ",
        categoryCount,
        " - TOTAL",
        categoryCount / entriesPerPage
      );
    } else {
      console.log("500 STATUS ", response.status);
    }
  }, [letter, entriesPerPage]);

  useEffect(() => {
    console.log("CHANGE LETTER -- ", letter);
    getCategoryCount();
  }, [letter, getCategoryCount]);

  return (
    <Group justify="center" mt={8}>
      <Pagination
        total={pageTotal}
        size="sm"
        radius="xs"
        className="center"
        value={activePage}
        onChange={setActivePage}
      />
    </Group>
  );
}
