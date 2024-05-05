"use client";

import { useState } from "react";
import PageLayout from "@/layout/page_layout";
import ResultsContainer from "./results_container";

export default function CategoryVisualizer() {
  const [loading, setLoading] = useState(true);

  return (
    <PageLayout subtitle={"Explore Wikipedia's categories"}>
      <ResultsContainer setLoading={setLoading} loading={loading} />
    </PageLayout>
  );
}
