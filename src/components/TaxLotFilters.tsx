import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Spacer,
  Switch,
  VStack,
} from "@nycplanning/streetscape";
import LegendSquare from "./LegendSquare";

function TaxLotFilters() {
  return (
    <>
      <Flex alignSelf={"flex-start"}>
        <Switch size="sm" pr={2} />
        Tax Lot Boundaries
      </Flex>

      <Accordion allowToggle border={0}>
        <AccordionItem border={0}>
          <AccordionButton px={0} _hover={{ border: 0 }}>
            <Switch size="sm" pr={2} />
            Land Use Colors
            <Spacer />
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <VStack px={3} alignItems={"flex-start"}>
              <Flex gap={2}>
                <LegendSquare color="#FEFFA4" />
                One & Two Family Buildings
              </Flex>
              <Flex gap={2}>
                <LegendSquare color="#F0B347" />
                Multi-Family Walk-Up Buildings
              </Flex>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default TaxLotFilters;
