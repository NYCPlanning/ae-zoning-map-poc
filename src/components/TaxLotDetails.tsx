import { TaxLot } from "../gen";
import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  Link,
} from "@nycplanning/streetscape";
import { CloseButton } from "@chakra-ui/react";

interface TaxLotDetailsProps {
  taxLot: TaxLot | null;
}

export const TaxLotDetails = ({ taxLot }: TaxLotDetailsProps) => {
  return taxLot === null ? null : (
    <Box
      bg="white"
      mb={6}
      p={4}
      borderRadius="base"
      border="0"
      position="fixed"
      top={6}
      right={6}
      width={"27.5rem"}
    >
      <CloseButton position="absolute" top={2} right={2} size="sm" />
      <VStack alignItems={"flex-start"} alignContent={"flex-start"}>
        <Text fontSize={"xl"} fontWeight={"bold"}>
          {taxLot.address}, [ZIP]
        </Text>
        <Text>Tax Lot: BBL{taxLot.bbl}</Text>
        <VStack
          bg="gray.100"
          borderRadius="base"
          border="0"
          p={4}
          width={"100%"}
        >
          <VStack>
            <HStack
              justifyContent={"space-evenly"}
              alignItems={"flex-start"}
              py={2}
            >
              <VStack width={24}>
                <img src="./nycmap.svg" width="40px" height="40px" />
                <Text fontWeight={"bold"}>Borough:</Text>
                <Text>
                  {taxLot.borough.title} (Borough {taxLot.borough.id})
                </Text>
              </VStack>
              <VStack width={24}>
                <img src="./buildings.svg" width="40px" height="40px" />
                <Text fontWeight={"bold"}>Block:</Text>
                <Text>{taxLot.block}</Text>
              </VStack>
              <VStack width={24}>
                <img src="./house.svg" width="40px" height="40px" />
                <Text fontWeight={"bold"}>Lot:</Text>
                <Text>{taxLot.lot}</Text>
              </VStack>
            </HStack>
            <Link
              href={`http://maps.nyc.gov/taxmap/map.htm?searchType=BblSearch&featureTypeName=EVERY_BBL&featureName=${taxLot.bbl}`}
              isExternal
              alignSelf={"flex-start"}
            >
              <HStack gap={1}>
                <svg
                  viewBox="0 0 24 24"
                  focusable="false"
                  width="1.5em"
                  height="1.5em"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14L21 3"></path>
                  </g>
                </svg>
                <Text textDecorationLine={"underline"}>
                  View Digital Tax Map
                </Text>
              </HStack>
            </Link>
          </VStack>
        </VStack>
        <Flex
          borderBottom="1px solid"
          borderColor="gray.400"
          width="100%"
          my={2}
        >
          <Text fontSize={"lg"} fontWeight={"bold"}>
            Zoning Details
          </Text>
        </Flex>
        <VStack alignItems={"flex-start"}>
          <Text fontWeight={"bold"}>Land Use:</Text>
          <Text
            textStyle="body"
            backgroundColor={taxLot.landUse.color}
            px={2}
            py={1}
            borderRadius={"base"}
            border={"1px solid"}
            borderColor={taxLot.landUse.color}
          >
            {taxLot.landUse.description}
          </Text>
          <HStack alignItems={"flex-start"} py={2}>
            <Text fontWeight={"bold"}>Zoning District:</Text>
            <VStack alignItems={"flex-start"}>
              <Text>C5-3</Text>
              <Text>LM</Text>
            </VStack>
          </HStack>
          <Link href="https://chakra-ui.com" isExternal>
            <HStack gap={1}>
              <svg
                viewBox="0 0 24 24"
                focusable="false"
                width="1.5em"
                height="1.5em"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14L21 3"></path>
                </g>
              </svg>
              <Text textDecorationLine={"underline"}>
                View C5-3 district guide
              </Text>
            </HStack>
          </Link>
          <Link href="https://chakra-ui.com" isExternal>
            <HStack gap={1}>
              <svg
                viewBox="0 0 24 24"
                focusable="false"
                width="1.5em"
                height="1.5em"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14L21 3"></path>
                </g>
              </svg>
              <Text textDecorationLine={"underline"}>
                View LM district guide
              </Text>
            </HStack>{" "}
          </Link>
        </VStack>
        <Flex
          borderBottom="1px solid"
          borderColor="gray.400"
          width="100%"
          my={2}
        >
          <Text fontSize={"lg"} fontWeight={"bold"}>
            Property Information
          </Text>
        </Flex>
        <HStack alignItems={"flex-start"} py={2}>
          <Text fontWeight={"bold"}>Owner:</Text>
          <VStack alignItems={"flex-start"}>
            <Text>NYC Department of Parks and Recreation</Text>
          </VStack>
        </HStack>
        <HStack
          justifyContent={"space-evenly"}
          alignItems={"flex-start"}
          width={"100%"}
          py={2}
        >
          <VStack width={24}>
            <img src="./area.svg" width="40px" height="40px" />
            <Text fontWeight={"bold"}>Lot Area:</Text>
            <Text>47,539 sq ft</Text>
          </VStack>
          <VStack width={24}>
            <img src="./arrows-horizontal.svg" width="40px" height="40px" />
            <Text fontWeight={"bold"}>Lot Frontage:</Text>
            <Text>195.17 ft</Text>
          </VStack>
          <VStack width={24}>
            <img src="./arrows-down-up.svg" width="40px" height="40px" />
            <Text fontWeight={"bold"}>Lot Depth:</Text>
            <Text>249.33 ft</Text>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
};
