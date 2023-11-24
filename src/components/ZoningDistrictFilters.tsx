import { Accordion } from "@nycplanning/streetscape";
import { useGetZoningDistrictClassCategoryColors } from "../gen";
import ZoningDistrictClassCategory from "./ZoningDistrictClassCategory";

function ZoningDistrictFilters() {
  const { data: classCategories } = useGetZoningDistrictClassCategoryColors();

  return (
    <Accordion allowMultiple allowToggle>
      {classCategories
        ?.sort((a, b) => a.category.localeCompare(b.category))
        .map((category) => (
          <ZoningDistrictClassCategory
            key={category.category}
            category={category.category}
            color={category.color}
          />
        ))}
    </Accordion>
  );
}

export default ZoningDistrictFilters;
