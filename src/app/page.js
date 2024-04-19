import Image from "next/image";
import CategoryVisualizer from "@/components/category_visualizer";

export default function Home() {
  return (
    <main className="flex flex-col flex-grow h-full min-h-screen">
      <CategoryVisualizer />
    </main>
  );
}
