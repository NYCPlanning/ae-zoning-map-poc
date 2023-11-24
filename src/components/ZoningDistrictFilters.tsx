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

function ZoningDistrictFilters() {
  const { data: classCategories } = useGetZoningDistrictClassCategoryColors();
  const { data: classes } = useGetZoningDistrictClasses();

  return (
    <Accordion allowMultiple allowToggle>
      {classCategories
        ?.sort((a, b) => a.category.localeCompare(b.category))
        .map((category) => (
          <AccordionItem key={category.category}>
            <AccordionButton px={0} _hover={{ border: 0 }}>
              <Switch size="sm" pr={2} />
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
                    <Checkbox size="sm" key={c.id}>
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
