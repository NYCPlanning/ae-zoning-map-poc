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

function ZoningDistrictFilters() {
  return (
    <Accordion allowMultiple allowToggle>
      <AccordionItem>
        <AccordionButton px={0} _hover={{ border: 0 }}>
          <Switch size="sm" pr={2} />
          Commercial Districts
          <LegendSquare color="#DE7E72" />
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
            <Checkbox size="sm">C1</Checkbox>
            <Checkbox size="sm">C2</Checkbox>
            <Checkbox size="sm">C3</Checkbox>
            <Checkbox size="sm">C4</Checkbox>
            <Checkbox size="sm">C5</Checkbox>
            <Checkbox size="sm">C6</Checkbox>
            <Checkbox size="sm">C7</Checkbox>
            <Checkbox size="sm">C8</Checkbox>
          </Stack>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton px={0} _hover={{ border: 0 }}>
          <Switch size="sm" pr={2} />
          Manufacturing Districts
          <LegendSquare color="#D39AE9" />
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
            <Checkbox size="sm">M1</Checkbox>
            <Checkbox size="sm">M2</Checkbox>
            <Checkbox size="sm">M3</Checkbox>
          </Stack>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton px={0} _hover={{ border: 0 }}>
          <Switch size="sm" pr={2} />
          Residential Districts
          <LegendSquare color="#FAEF83" />
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
            <Checkbox size="sm">R1</Checkbox>
            <Checkbox size="sm">R2</Checkbox>
            <Checkbox size="sm">R3</Checkbox>
            <Checkbox size="sm">R4</Checkbox>
            <Checkbox size="sm">R5</Checkbox>
            <Checkbox size="sm">R6</Checkbox>
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default ZoningDistrictFilters;
