import { create } from "zustand";

const useLateralMenuStore = create((set) => ({
  collapsed: false,
  displayedMenu: "category",
  setCollapsed: (newState) => {
    set(() => ({ collapsed: newState }));
  },
  setDisplayedMenu: (newDisplayedMenu) => {
    set(() => ({ displayedMenu: newDisplayedMenu }));
  },
}));

export default useLateralMenuStore;
