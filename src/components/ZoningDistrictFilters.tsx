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
  HStack,
} from "@nycplanning/streetscape";
import LegendSquare from "./LegendSquare";
import {
  useGetZoningDistrictClassCategoryColors,
  useGetAllZoningDistrictClasses,
} from "../gen";
import { useStore } from "../store";
import { useEffect, useState } from "react";

function ZoningDistrictFilters() {
  const { data: categoryColorsData } =
    useGetZoningDistrictClassCategoryColors();
  const { data: classesData } = useGetAllZoningDistrictClasses();

  const {
    anyZoningDistrictsVisibility,
    visibleZoningDistrictCategories,
    toggleZoningDistrictCategoryVisibility,
    visibleZoningDistrictClasses,
    toggleZoningDistrictClassVisibility,
    setDefaultStateBasedOnApiData,
  } = useStore((state) => state);

  const [expandedIndices, setExpandedIndicies] = useState<number[]>([]);
  useEffect(() => {
    const zoningDistrictCategoryIds =
      categoryColorsData === undefined
        ? []
        : categoryColorsData.zoningDistrictClassCategoryColors.reduce(
            (acc: Array<string>, curr: any) => [
              ...acc,
              curr.category.toLocaleLowerCase(),
            ],
            [],
          );
    const zoningDistrictClassIds =
      classesData === undefined
        ? []
        : classesData.zoningDistrictClasses.reduce(
            (acc: Array<string>, curr: any) => [...acc, curr.id],
            [],
          );
    setDefaultStateBasedOnApiData(
      zoningDistrictCategoryIds,
      zoningDistrictClassIds,
    );
  }, [categoryColorsData, classesData, setDefaultStateBasedOnApiData]);

  return (
    <Accordion
      allowMultiple
      display={anyZoningDistrictsVisibility ? "" : "none"}
      index={expandedIndices}
    >
      {categoryColorsData?.zoningDistrictClassCategoryColors
        .sort((a, b) => a.category.localeCompare(b.category))
        .map((category, i) => (
          <AccordionItem key={category.category}>
            <HStack>
              <Switch
                size="sm"
                pr={2}
                onChange={() => {
                  if (
                    visibleZoningDistrictCategories.has(
                      category.category.toLocaleLowerCase(),
                    )
                  ) {
                    if (expandedIndices.includes(i)) {
                      setExpandedIndicies(
                        expandedIndices.filter(
                          (expandedIndex) => expandedIndex !== i,
                        ),
                      );
                    }
                  } else {
                    setExpandedIndicies(expandedIndices.concat([i]));
                  }
                  toggleZoningDistrictCategoryVisibility(
                    category.category.toLocaleLowerCase(),
                  );
                }}
                isChecked={visibleZoningDistrictCategories.has(
                  category.category.toLocaleLowerCase(),
                )}
              />
              <AccordionButton
                px={0}
                _hover={{ border: 0 }}
                onClick={() => {
                  if (
                    visibleZoningDistrictCategories.has(
                      category.category.toLocaleLowerCase(),
                    )
                  ) {
                    if (expandedIndices.includes(i)) {
                      setExpandedIndicies(
                        expandedIndices.filter(
                          (expandedIndex) => expandedIndex !== i,
                        ),
                      );
                    } else {
                      setExpandedIndicies(expandedIndices.concat([i]));
                    }
                  }
                }}
              >
                {category.category} Districts
                <LegendSquare color={category.color} />
                <Spacer />
                <AccordionIcon />
              </AccordionButton>
            </HStack>
            <AccordionPanel p={0}>
              <Stack
                direction={["column", "row"]}
                spacing={8}
                flexWrap={"wrap"}
                justifyContent={"flex-start"}
                py={2.5}
                px={9}
              >
                {classesData?.zoningDistrictClasses
                  .filter((c) => {
                    return c.category == category.category;
                  })
                  .map((c) => (
                    <Checkbox
                      size="sm"
                      key={c.id}
                      onChange={() => {
                        toggleZoningDistrictClassVisibility(c.id);
                      }}
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
