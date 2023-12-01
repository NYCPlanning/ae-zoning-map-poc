import { create } from "zustand";

export type Store = {
  zoningDistrictVisibility: boolean;
  toggleZoningDistrictVisibility: () => void;
};

export const useStore = create<Store>()((set) => ({
  zoningDistrictVisibility: false,
  toggleZoningDistrictVisibility: () =>
    set((state) => ({
      zoningDistrictVisibility: !state.zoningDistrictVisibility,
    })),
}));
