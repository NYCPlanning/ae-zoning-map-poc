import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Spacer,
  Text,
  VStack,
} from "@nycplanning/streetscape";
import FilterList from "./FilterList";
import { MapCtxt } from "../state";
import { useContext } from "react";

function LayersFilters() {
  const {
    mapState: { zoningDistricts },
    mapActionsDispatch: { updateZoningDistrictsVisibility },
  } = useContext(MapCtxt);

  return (
    <AccordionItem
      bg="white"
      mb={6}
      borderRadius="0.75rem 0 0.75rem 0.75rem"
      border="0"
    >
      {({ isExpanded }: { isExpanded: boolean }) => (
        <>
          <AccordionButton p={0} _hover={{ borderColor: "white" }}>
            <Flex
              width={"30rem"}
              mr="-4rem"
              bg="white"
              borderRadius={"base"}
              py={4}
              pl={4}
              pr={2}
            >
              <Text textStyle="lead">Layers and Filters</Text>
              <Spacer />
              <Box transform={isExpanded ? "" : "rotate(180deg);"}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 10.6667L24 18.6667H8L16 10.6667Z"
                    fill="#4A5568"
                  />
                </svg>
              </Box>
            </Flex>
          </AccordionButton>
          <AccordionPanel pt={0} pb={4}>
            <form>
              <Flex
                id="layers"
                borderTop="1px solid"
                borderColor="gray.400"
                pt={4}
                justify="center"
                gap={6}
              >
                <VStack
                  width={20}
                  justify="center"
                  alignSelf={"flex-start"}
                  onClick={() =>
                    updateZoningDistrictsVisibility(zoningDistricts)
                  }
                >
                  <Box
                    background={
                      "url('./zoning_districts.png') 50% / cover no-repeat;"
                    }
                    width={20}
                    height={20}
                    borderRadius={"12px"}
                    border={zoningDistricts ? "2px solid" : "0"}
                    borderColor={"primary.500"}
                  />
                  <Text
                    align="center"
                    color={zoningDistricts ? "primary.500" : "gray.600"}
                    fontWeight={zoningDistricts ? "500" : "400"}
                  >
                    Zoning Districts
                  </Text>
                </VStack>
                <VStack
                  width={20}
                  justify="center"
                  alignSelf={"flex-start"}
                  onClick={() =>
                    updateZoningDistrictsVisibility(zoningDistricts)
                  }
                >
                  <Box
                    background={"url('./tax_lots.png') 50% / cover no-repeat;"}
                    width={20}
                    height={20}
                    borderRadius={"12px"}
                    border={zoningDistricts ? "2px solid" : "0"}
                    borderColor={"primary.500"}
                  />
                  <Text
                    align="center"
                    color={zoningDistricts ? "primary.500" : "gray.600"}
                    fontWeight={zoningDistricts ? "500" : "400"}
                  >
                    Tax Lots
                  </Text>
                </VStack>
              </Flex>

              <Accordion id="filters" allowToggle defaultIndex={0}>
                <AccordionItem bg="white" border="0">
                  <AccordionButton
                    border="0"
                    p={0}
                    bg="white"
                    _hover={{ backgroundColor: "white" }}
                  >
                    <Text textStyle="body" fontWeight={700} py={1}>
                      Filters
                    </Text>
                    <AccordionIcon />
                    <Spacer />
                    <Text
                      textStyle="body"
                      backgroundColor={"brand.50"}
                      px={2}
                      py={1}
                      borderRadius={"base"}
                      border={"1px solid"}
                      borderColor={"brand.100"}
                    >
                      Selected (5)
                    </Text>
                  </AccordionButton>
                  <AccordionPanel px={0}>
                    <FilterList />
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </form>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
}

export default LayersFilters;
