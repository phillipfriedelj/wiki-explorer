import Image from "next/image";
import CategoryVisualizer from "@/components/category_visualizer";
// import { useEffect } from "react";

export default function Home() {
  // const articleCount = 0;
  // const categoryCount = 0;

  // async function getArticleCount() {
  //   articleCount = await fetch(`/api/articles/`);
  // }

  // async function getCategoryCount() {
  //   categoryCount = await fetch(`/api/categories/`);
  // }

  // useEffect(() => {
  //   getArticleCount();
  //   getCategoryCount();
  // }, []);

  return (
    <main className="flex flex-col flex-grow h-full min-h-screen">
      <CategoryVisualizer />
    </main>
  );
}
