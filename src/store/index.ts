import { create } from "zustand";

export type Store = {
  infoPane: string;
  setInfoPane: (info: string) => void;
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
  infoPane: "",
  setInfoPane: (info: string) =>
    set(() => ({
      infoPane: info,
    })),
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
      anyZoningDistrictsVisibility: layerVisibilityCheck(
        state.visibleZoningDistrictClasses,
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
  const newSet = new Set(list);
  newSet.has(id) ? newSet.delete(id) : newSet.add(id);
  return newSet;
}

function layerVisibilityCheck(list: Set<string>) {
  return list.size == 0 ? false : true;
}

function addToList(list: Set<string>, ids: Array<string>) {
  const newSet = new Set(list);
  ids.forEach((id) => newSet.add(id));
  return newSet;
}
