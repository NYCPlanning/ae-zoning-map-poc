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
import { useGetLandUses } from "../gen";

function TaxLotFilters() {
  const { data: landUses } = useGetLandUses();

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
              {landUses !== undefined
                ? landUses.map((lu) => (
                    <Flex gap={2} key={lu.id}>
                      <LegendSquare color={lu.color} />
                      {lu.description}
                    </Flex>
                  ))
                : null}
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default TaxLotFilters;
