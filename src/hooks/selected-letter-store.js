import { create } from "zustand";

const useSelectedLetterStore = create((set) => ({
  selectedLetter: "a",
  setSelectedLetter: (newLetter) =>
    set(() => ({
      selectedLetter: newLetter,
    })),
}));

export default useSelectedLetterStore;
