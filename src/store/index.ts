import { create } from "zustand";

export type Store = {
  allZoningDistrictsVisibility: boolean;
  toggleAllZoningDistrictsVisibility: () => void;
  visibleZoningDistrictClasses: Set<string>;
  toggleZoningDistrictClassVisibility: (classId: string) => void;
  visibleZoningDistrictCategories: Set<string>;
  toggleZoningDistrictCategoryVisibility: (categoryId: string) => void;
  allTaxLotsVisibility: boolean;
  toggleAllTaxLotsVisibility: () => void;
};

export const useStore = create<Store>()((set) => ({
  allZoningDistrictsVisibility: false,
  toggleAllZoningDistrictsVisibility: () =>
    set((state) => ({
      allZoningDistrictsVisibility: !state.allZoningDistrictsVisibility,
    })),
  visibleZoningDistrictClasses: new Set([]),
  toggleZoningDistrictClassVisibility: (classId: string) =>
    set((state) => ({
      visibleZoningDistrictClasses: toggleVisibility(
        state.visibleZoningDistrictClasses,
        classId,
      ),
    })),
  visibleZoningDistrictCategories: new Set([]),
  toggleZoningDistrictCategoryVisibility: (categoryId: string) =>
    set((state) => ({
      visibleZoningDistrictCategories: toggleVisibility(
        state.visibleZoningDistrictCategories,
        categoryId,
      ),
    })),
  allTaxLotsVisibility: false,
  toggleAllTaxLotsVisibility: () =>
    set((state) => ({
      allTaxLotsVisibility: !state.allTaxLotsVisibility,
    })),
}));

function toggleVisibility(list: Set<string>, id: string) {
  list.has(id) ? list.delete(id) : list.add(id);
  return list;
}
