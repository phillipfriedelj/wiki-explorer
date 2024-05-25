import { create } from "zustand";

const useSelectedLinkStore = create((set) => ({
  selectedLink: "https://en.wikipedia.org/wiki/Main_Page",
  setSelectedLink: (newLink) =>
    set(() => ({
      selectedLink: `https://en.wikipedia.org/wiki/${newLink}`,
    })),
}));

export default useSelectedLinkStore;
