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
  useGetZoningDistrictClasses,
} from "../gen";
import { useStore } from "../store";
import { useEffect, useState } from "react";

function ZoningDistrictFilters() {
  const { data: classCategories } = useGetZoningDistrictClassCategoryColors();
  const { data: classes } = useGetZoningDistrictClasses();

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
      index={expandedIndices}
    >
      {classCategories
        ?.sort((a, b) => a.category.localeCompare(b.category))
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
            <AccordionPanel>
              <Stack
                direction={["column", "row"]}
                spacing={8}
                flexWrap={"wrap"}
                justifyContent={"flex-start"}
                px={9}
              >
                {classes
                  ?.filter((c) => {
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
