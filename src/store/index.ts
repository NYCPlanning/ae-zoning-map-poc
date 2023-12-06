import { create } from "zustand";

export type Store = {
  allZoningDistrictsVisibility: boolean;
  toggleAllZoningDistrictsVisibility: () => void;
  visibleZoningDistrictCategories: Set<string>;
  toggleZoningDistrictCategoryVisibility: (classId: string) => void;
  visibleZoningDistrictClasses: Set<string>;
  toggleZoningDistrictClassVisibility: (categoryId: string) => void;
  allTaxLotsVisibility: boolean;
  toggleAllTaxLotsVisibility: () => void;
  setDefaultStateBasedOnApiData: (zoningDistrictClassIds: Array<string>) => void;
};

export const useStore = create<Store>()((set) => ({
  allZoningDistrictsVisibility: false,
  toggleAllZoningDistrictsVisibility: () =>
    set((state) => ({
      allZoningDistrictsVisibility: !state.allZoningDistrictsVisibility,
    })),
  visibleZoningDistrictCategories: new Set([]),
  toggleZoningDistrictCategoryVisibility: (classId: string) =>
    set((state) => ({
      visibleZoningDistrictCategories: toggleVisibility(
        state.visibleZoningDistrictCategories,
        classId,
      ),
    })),
  visibleZoningDistrictClasses: new Set([]),
  toggleZoningDistrictClassVisibility: (categoryId: string) =>
    set((state) => ({
      visibleZoningDistrictClasses: toggleVisibility(
        state.visibleZoningDistrictClasses,
        categoryId,
      ),
    })),
  allTaxLotsVisibility: false,
  toggleAllTaxLotsVisibility: () =>
    set((state) => ({
      allTaxLotsVisibility: !state.allTaxLotsVisibility,
    })),
  setDefaultStateBasedOnApiData: (zoningDistrictClassIds: Array<string>) => 
    set((state) => ({
      visibleZoningDistrictClasses: addToList(state.visibleZoningDistrictClasses, zoningDistrictClassIds),
    })),
}));

function toggleVisibility(list: Set<string>, id: string) {
  list.has(id) ? list.delete(id) : list.add(id);
  return list;
}

function addToList(list: Set<string>, ids: Array<string>) {
  ids.forEach(id => list.add(id));
  return list;
}