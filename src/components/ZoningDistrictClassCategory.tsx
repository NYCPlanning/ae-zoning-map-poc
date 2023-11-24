import {
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
import { useGetZoningDistrictClasses } from "../gen";
import type { ZoningDistrictClassCategoryColor } from "../gen";

function ZoningDistrictClassCategory({
  category,
  color,
}: ZoningDistrictClassCategoryColor) {
  const { data: classes } = useGetZoningDistrictClasses();

  return (
    <AccordionItem key={category}>
      <AccordionButton px={0} _hover={{ border: 0 }}>
        <Switch size="sm" pr={2} />
        {category} Districts
        <LegendSquare color={color} />
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
              return x.category == category;
            })
            .map((c) => (
              <Checkbox size="sm" key={c.id}>
                {c.id}
              </Checkbox>
            ))}
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default ZoningDistrictClassCategory;
