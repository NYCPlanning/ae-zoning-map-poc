import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Spacer,
} from "@nycplanning/streetscape";
import ZoningDistrictFilters from "./ZoningDistrictFilters";

function FilterList() {
  return (
    <Accordion allowMultiple allowToggle>
      <AccordionItem>
        <AccordionButton px={0} _hover={{ border: 0 }}>
          Zoning Districts
          <Spacer />
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel p={0}>
          <ZoningDistrictFilters />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton px={0} _hover={{ border: 0 }}>
          Tax Lots
          <Spacer />
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel p={0}>Tax lot filters</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default FilterList;
