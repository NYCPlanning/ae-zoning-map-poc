import {
  AccordionButton,
  AccordionPanel,
  AccordionItem,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Spacer,
  Text,
} from "@nycplanning/streetscape";
import { useGetBoroughs } from "../gen";

function LocationSearch() {
  const { data: boroughs } = useGetBoroughs();
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
              <Text textStyle="lead">Location Search</Text>
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
              <FormControl
                id="borough"
                borderTop="1px solid"
                borderColor="gray.400"
                pt={4}
              >
                <FormLabel>Borough</FormLabel>
                <Select placeholder="-Select-" variant="base">
                  {boroughs !== undefined
                    ? boroughs.map((borough) => (
                        <option key={borough.id} value={borough.id}>
                          {borough.title}
                        </option>
                      ))
                    : null}
                </Select>
                <FormErrorMessage>You must select a borough.</FormErrorMessage>
              </FormControl>

              <Box flexDirection={"row"} display={"flex"} gap={5} pt={3} pb={5}>
                <FormControl id="block" flex="1">
                  <FormLabel>Block</FormLabel>
                  <Input placeholder="Placeholder Text" />
                  <FormErrorMessage>You must select a block.</FormErrorMessage>
                </FormControl>
                <FormControl id="lot" flex="1">
                  <FormLabel>Lot</FormLabel>
                  <Input placeholder="Placeholder Text" />
                  <FormErrorMessage>You must select a lot.</FormErrorMessage>
                </FormControl>
              </Box>

              <Button size="md" variant="primary" width="full">
                Search
              </Button>
            </form>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
}

export default LocationSearch;
