import { create } from "zustand";

export type Store = {
  allZoningDistrictsVisibility: boolean;
  toggleAllZoningDistrictsVisibility: () => void;
  allTaxLotsVisibility: boolean;
  toggleAllTaxLotsVisibility: () => void;
};

export const useStore = create<Store>()((set) => ({
  allZoningDistrictsVisibility: false,
  toggleAllZoningDistrictsVisibility: () =>
    set((state) => ({
      allZoningDistrictsVisibility: !state.allZoningDistrictsVisibility,
    })),
  allTaxLotsVisibility: false,
  toggleAllTaxLotsVisibility: () =>
    set((state) => ({
      allTaxLotsVisibility: !state.allTaxLotsVisibility,
    })),
}));
