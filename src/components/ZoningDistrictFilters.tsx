import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Spacer,
  Switch,
} from "@nycplanning/streetscape";

function ZoningDistrictFilters() {
  return (
    <Accordion allowMultiple allowToggle>
      <AccordionItem>
        <AccordionButton px={0} _hover={{ border: 0 }}>
          <Switch size="sm" pr={2} />
          Commercial Districts
          <Spacer />
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>Commercial Districts toggles</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton px={0} _hover={{ border: 0 }}>
          <Switch size="sm" pr={2} />
          Manufacturing Districts
          <Spacer />
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>Manufacturing Districts toggles</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton px={0} _hover={{ border: 0 }}>
          <Switch size="sm" pr={2} />
          Residential Districts
          <Spacer />
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>Residential Districts toggles</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default ZoningDistrictFilters;
