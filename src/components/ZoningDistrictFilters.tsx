import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Checkbox,
  Spacer,
  Stack,
  Switch,
} from "@nycplanning/streetscape";
import LegendSquare from "./LegendSquare";
import {
  useGetZoningDistrictClassCategoryColors,
  useGetZoningDistrictClasses,
} from "../gen";
import { useStore } from "../store";
import { useEffect } from "react";

function ZoningDistrictFilters() {
  const { data: classCategories } = useGetZoningDistrictClassCategoryColors();
  const { data: classes } = useGetZoningDistrictClasses();

  const anyZoningDistrictsVisibility = useStore(
    (state) => state.anyZoningDistrictsVisibility,
  );
  const visibleZoningDistrictCategories = useStore(
    (state) => state.visibleZoningDistrictCategories,
  );
  const toggleZoningDistrictCategoryVisibility = useStore(
    (state) => state.toggleZoningDistrictCategoryVisibility,
  );
  const visibleZoningDistrictClasses = useStore(
    (state) => state.visibleZoningDistrictClasses,
  );
  const toggleZoningDistrictClassVisibility = useStore(
    (state) => state.toggleZoningDistrictClassVisibility,
  );
  const setDefaultStateBasedOnApiData = useStore(
    (state) => state.setDefaultStateBasedOnApiData,
  );

  useEffect(() => {
    const zoningDistrictCategoryIds =
      typeof classCategories === "undefined"
        ? []
        : classCategories.reduce(
            (acc: Array<string>, curr: any) => [
              ...acc,
              curr.category.toLocaleLowerCase(),
            ],
            [],
          );
    const zoningDistrictClassIds =
      typeof classes === "undefined"
        ? []
        : classes.reduce(
            (acc: Array<string>, curr: any) => [...acc, curr.id],
            [],
          );
    setDefaultStateBasedOnApiData(
      zoningDistrictCategoryIds,
      zoningDistrictClassIds,
    );
  }, [classCategories, classes]);

  return (
    <Accordion
      allowMultiple
      display={anyZoningDistrictsVisibility ? "" : "none"}
    >
      {classCategories
        ?.sort((a, b) => a.category.localeCompare(b.category))
        .map((category) => (
          <AccordionItem key={category.category}>
            <AccordionButton px={0} _hover={{ border: 0 }}>
              <Switch
                size="sm"
                pr={2}
                onChange={() =>
                  toggleZoningDistrictCategoryVisibility(
                    category.category.toLocaleLowerCase(),
                  )
                }
                isChecked={visibleZoningDistrictCategories.has(
                  category.category.toLocaleLowerCase(),
                )}
              />
              {category.category} Districts
              <LegendSquare color={category.color} />
              <Spacer />
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Stack
                direction={["column", "row"]}
                spacing={8}
                flexWrap={"wrap"}
                justifyContent={"flex-start"}
                px={9}
              >
                {classes
                  ?.filter((x) => {
                    return x.category == category.category;
                  })
                  .map((c) => (
                    <Checkbox
                      size="sm"
                      key={c.id}
                      onChange={() => toggleZoningDistrictClassVisibility(c.id)}
                      isChecked={visibleZoningDistrictClasses.has(c.id)}
                    >
                      {c.id}
                    </Checkbox>
                  ))}
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        ))}
    </Accordion>
  );
}

export default ZoningDistrictFilters;
