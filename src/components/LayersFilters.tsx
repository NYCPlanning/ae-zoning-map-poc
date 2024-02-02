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
import { useStore } from "../store";
import {
  useGetZoningDistrictClassCategoryColors,
  useGetAllZoningDistrictClasses,
} from "../gen";

function LayersFilters() {
  const { data: categoryColorsData } =
    useGetZoningDistrictClassCategoryColors();
  const { data: classesData } = useGetAllZoningDistrictClasses();

  const visibleZoningDistrictClasses = useStore(
    (state) => state.visibleZoningDistrictClasses,
  );
  const anyZoningDistrictsVisibility = useStore(
    (state) => state.anyZoningDistrictsVisibility,
  );
  const toggleAnyZoningDistrictsVisibility = useStore(
    (state) => state.toggleAnyZoningDistrictsVisibility,
  );
  const visibleZoningDistrictCategories = useStore(
    (state) => state.visibleZoningDistrictCategories,
  );
  const anyTaxLotsVisibility = useStore((state) => state.anyTaxLotsVisibility);
  const toggleAnyTaxLotsVisibility = useStore(
    (state) => state.toggleAnyTaxLotsVisibility,
  );
  const visibleTaxLotsBoundaries = useStore(
    (state) => state.visibleTaxLotsBoundaries,
  );
  const visibleLandUseColors = useStore((state) => state.visibleLandUseColors);
  const setDefaultStateBasedOnApiData = useStore(
    (state) => state.setDefaultStateBasedOnApiData,
  );

  function getFilterCount() {
    let zoningFilterCount = 0;
    let taxLotFilterCount = 0;
    if (anyZoningDistrictsVisibility)
      zoningFilterCount = visibleZoningDistrictCategories.size;
    if (anyTaxLotsVisibility) {
      if (visibleTaxLotsBoundaries) taxLotFilterCount++;
      if (visibleLandUseColors) taxLotFilterCount++;
    }
    return zoningFilterCount + taxLotFilterCount;
  }

  function handleZoningDistrictsVisibility() {
    toggleAnyZoningDistrictsVisibility();
    // The below resets all toggles and checkboxes if they are all untoggled/unchecked
    if (
      visibleZoningDistrictClasses.size == 0 &&
      visibleZoningDistrictCategories.size == 0
    ) {
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
    }
  }

  return (
    <AccordionItem mb={6} borderRadius="0.75rem" border="0">
      {({ isExpanded }: { isExpanded: boolean }) => (
        <>
          <AccordionButton
            height={16}
            background="white"
            px={4}
            py={0}
            borderRadius={isExpanded ? "0.75rem 0 0 0" : "0.75rem"}
            _hover={{ backgroundColor: "white" }}
          >
            <Text fontSize={"lg"} fontWeight={"bold"}>
              Layers and Filters
            </Text>
            <Spacer />
            <Flex
              height={"full"}
              borderTopRightRadius={"base"}
              borderBottomRightRadius={"base"}
              backgroundColor={"white"}
              align={"center"}
              transform={isExpanded ? "translateX(3rem)" : ""}
              transition={"all 0.25s"}
            >
              <Box
                transform={isExpanded ? "" : "rotate(180deg)"}
                transition={"all 0.25s"}
              >
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
          <AccordionPanel
            pt={5}
            pb={4}
            px={4}
            background={"white"}
            borderTop="1px dotted"
            borderColor="gray.400"
            borderRadius={"0 0 0.75rem 0.75rem"}
          >
            <Box maxH={"300px"} overflowY={"scroll"}>
              <form>
                <Flex id="layers" justify="center" gap={6}>
                  <VStack
                    width={20}
                    justify="center"
                    alignSelf={"flex-start"}
                    onClick={handleZoningDistrictsVisibility}
                  >
                    <Box
                      background={
                        "url('./zoning_districts.png') 50% / cover no-repeat;"
                      }
                      width={20}
                      height={20}
                      borderRadius={"12px"}
                      border={anyZoningDistrictsVisibility ? "2px solid" : "0"}
                      borderColor={"primary.500"}
                    />
                    <Text
                      align="center"
                      color={
                        anyZoningDistrictsVisibility
                          ? "primary.500"
                          : "gray.600"
                      }
                      fontWeight={anyZoningDistrictsVisibility ? "500" : "400"}
                    >
                      Zoning Districts
                    </Text>
                  </VStack>
                  <VStack
                    width={20}
                    justify="center"
                    alignSelf={"flex-start"}
                    onClick={toggleAnyTaxLotsVisibility}
                  >
                    <Box
                      background={
                        "url('./tax_lots.png') 50% / cover no-repeat;"
                      }
                      width={20}
                      height={20}
                      borderRadius={"12px"}
                      border={anyTaxLotsVisibility ? "2px solid" : "0"}
                      borderColor={"primary.500"}
                    />
                    <Text
                      align="center"
                      color={anyTaxLotsVisibility ? "primary.500" : "gray.600"}
                      fontWeight={anyTaxLotsVisibility ? "500" : "400"}
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
                      <AccordionIcon
                        display={
                          anyZoningDistrictsVisibility || anyTaxLotsVisibility
                            ? ""
                            : "none"
                        }
                      />
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
                        Selected ({getFilterCount()})
                      </Text>
                    </AccordionButton>
                    <AccordionPanel px={0}>
                      <FilterList />
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </form>
            </Box>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
}

export default LayersFilters;
