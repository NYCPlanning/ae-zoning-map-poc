import { create } from "zustand";

export type Store = {
  anyZoningDistrictsVisibility: boolean;
  toggleAnyZoningDistrictsVisibility: () => void;
  visibleZoningDistrictCategories: Set<string>;
  toggleZoningDistrictCategoryVisibility: (classId: string) => void;
  visibleZoningDistrictClasses: Set<string>;
  toggleZoningDistrictClassVisibility: (categoryId: string) => void;
  anyTaxLotsVisibility: boolean;
  toggleAnyTaxLotsVisibility: () => void;
  setDefaultStateBasedOnApiData: (
    zoningDistrictCategoryIds: Array<string>,
    zoningDistrictClassIds: Array<string>,
  ) => void;
};

export const useStore = create<Store>()((set) => ({
  anyZoningDistrictsVisibility: false,
  toggleAnyZoningDistrictsVisibility: () =>
    set((state) => ({
      anyZoningDistrictsVisibility: !state.anyZoningDistrictsVisibility,
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
  anyTaxLotsVisibility: false,
  toggleAnyTaxLotsVisibility: () =>
    set((state) => ({
      anyTaxLotsVisibility: !state.anyTaxLotsVisibility,
    })),
  setDefaultStateBasedOnApiData: (
    zoningDistrictCategoryIds: Array<string>,
    zoningDistrictClassIds: Array<string>,
  ) =>
    set((state) => ({
      visibleZoningDistrictCategories: addToList(
        state.visibleZoningDistrictCategories,
        zoningDistrictCategoryIds,
      ),
      visibleZoningDistrictClasses: addToList(
        state.visibleZoningDistrictClasses,
        zoningDistrictClassIds,
      ),
    })),
}));

function toggleVisibility(list: Set<string>, id: string) {
  list.has(id) ? list.delete(id) : list.add(id);
  return list;
}

function addToList(list: Set<string>, ids: Array<string>) {
  ids.forEach((id) => list.add(id));
  return list;
}
